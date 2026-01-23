# %%
import argparse
import json
from copy import deepcopy
from pathlib import Path
from collections import defaultdict

# ---------------------------------------------------------------------------
# CLI argument parsing
# ---------------------------------------------------------------------------
parser = argparse.ArgumentParser(description="Generate english.json lexicon")
parser.add_argument(
    "-o",
    "--output",
    type=Path,
    default=Path("english.json"),
    help="Output path for the generated JSON (default: english.json)",
)
args = parser.parse_args()

# Load irregular noun/verb maps early so helper functions can reference them
irregular_nouns = json.loads(Path("irregular_noun_forms.json").read_text())
irregular_verbs = json.loads(Path("irregular_verb_forms.json").read_text())

# ---------------------------------------------------------------------------
# Helper functions for inflection (noun plural, verb forms)
# ---------------------------------------------------------------------------


def noun_to_noun_pl(singular: str) -> str:
    """Very small pluraliser – handles regular patterns used in TinyStories."""
    # irregular first
    if singular in irregular_nouns:
        return irregular_nouns[singular]["plural"]
    # regular patterns
    if singular.endswith(("s", "sh", "ch", "x")):
        return singular + "es"
    if singular.endswith("y") and len(singular) > 1 and singular[-2] not in "aeiou":
        return singular[:-1] + "ies"
    return singular + "s"


# Adjective inflection helpers ----------------------------------------------------


def adjective_to_adverb(adjective: str) -> str:
    if adjective.endswith("y"):
        return adjective[:-1] + "ily"
    if (
        adjective.endswith("le")
        or adjective.endswith("able")
        or adjective.endswith("ible")
    ):
        return adjective[:-2] + "ly"
    if adjective.endswith("ic"):
        return adjective + "ally"
    return adjective + "ly"


# Verb inflection helpers ----------------------------------------------------

# `irregular_verbs` already loaded above


def dict_to_inf(verb: str) -> str | None:  # base form
    if verb in irregular_verbs:
        return irregular_verbs[verb]["VB"]
    return verb


def dict_to_vbd(verb: str) -> str | None:  # preterite
    if verb in irregular_verbs:
        return irregular_verbs[verb]["VBD"]
    if verb.endswith("e"):
        return verb + "d"
    if verb.endswith("y") and verb[-2] not in "aeiou":
        return verb[:-1] + "ied"
    return verb + "ed"


def dict_to_vbn(verb: str) -> str | None:  # past-participle
    if verb in irregular_verbs:
        return irregular_verbs[verb]["VBN"]
    return dict_to_vbd(verb)


def dict_to_vbg(verb: str) -> str | None:  # gerund
    if verb in irregular_verbs:
        return irregular_verbs[verb]["VBG"]
    if verb.endswith("ie"):
        return verb[:-2] + "ying"
    if verb.endswith("e") and verb != "be":  # be -> being (already ends with e)
        return verb[:-1] + "ing"
    return verb + "ing"


def dict_to_vbz(verb: str) -> str | None:  # 3rd-person-singular
    if verb in irregular_verbs:
        return irregular_verbs[verb]["VBZ"]
    if verb.endswith(("s", "sh", "ch", "x")):
        return verb + "es"
    if verb.endswith("y") and verb[-2] not in "aeiou":
        return verb[:-1] + "ies"
    return verb + "s"


def dict_to_vbp(verb: str) -> str | None:  # 3rd-person-plural (eg "they go")
    if verb in irregular_verbs:
        return irregular_verbs[verb]["VBP"]
    # usually just the same as VB
    return verb


# ---------------------------------------------------------------------------
# Extract verb categories from local VerbNet JSON dump
# ---------------------------------------------------------------------------

# Folders containing downloaded/converted VerbNet class files
VERBNET_DIRS = [Path("verb_verbnet"), Path("verb_custom")]


def _normalize_primary(primary):
    """
    Simplify a VerbNet primary frame to the slot sequence we care about.
    """
    slots = [p.split(".")[0] for p in primary]
    for i, slot in enumerate(slots):
        if slot == "NP-Dative":
            slots[i] = "NP"
    return slots


# ---------------------------------------------------------------------------
# Determine verb category from a simplified primary frame
# ---------------------------------------------------------------------------


def cat_from_primary(
    slots: list[str], particle: str | None = None, preposition: str | None = None
) -> str | None:
    """Return one of our verb category names given *slots* sequence, particle, and preposition or None."""
    if slots == ["NP", "V"] or slots == ["It", "V"]:
        # preposition must have a complement of some sort
        if preposition is not None:
            return None

        # CGEL 6.3.2 Structure I
        if particle is not None:
            return f"vb_prt{particle}"

        return "vb"
    if slots == ["NP", "V", "ADJ"]:
        if particle is not None and preposition is not None:
            # CGEL 6.3.2 Structure VI (with as)
            return f"vb_prt{particle}_prp{preposition}_predcomp"
        elif particle is not None:
            # CGEL 6.3.2 Structure VI (without as)
            return f"vb_prt{particle}_predcomp"
        elif preposition is not None:
            # CGEL 6.1.2 Structure IV
            return f"vb_prp{preposition}_predcomp"

        return "vb_predcomp"
    if slots == ["NP", "V", "S_INF"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_to_inf_cl"
        elif particle is not None:
            return f"vb_prt{particle}_to_inf_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_to_inf_cl"

        return "vb_to_inf_cl"
    if slots == ["NP", "V", "S_BARE_INF"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_bare_inf_cl"
        elif particle is not None:
            return f"vb_prt{particle}_bare_inf_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_bare_inf_cl"

        return "vb_bare_inf_cl"
    if slots == ["NP", "V", "S_ING"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_vbg_cl"
        elif particle is not None:
            return f"vb_prt{particle}_vbg_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_vbg_cl"

        return "vb_vbg_cl"
    if slots == ["NP", "V", "VP_VBN"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_vbn_cl"
        elif particle is not None:
            return f"vb_prt{particle}_vbn_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_vbn_cl"
        return "vb_vbn_cl"
    if slots == ["NP", "V", "PASSIVE_CL"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_passive_cl"
        elif particle is not None:
            return f"vb_prt{particle}_passive_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_passive_cl"
        return "vb_passive_cl"
    if slots == ["NP", "V", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_bare_declarative_cl"
        elif particle is not None:
            return f"vb_prt{particle}_bare_declarative_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_bare_declarative_cl"
        return "vb_bare_declarative_cl"
    if slots == ["NP", "V", "that", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_that_declarative_cl"
        elif particle is not None:
            return f"vb_prt{particle}_that_declarative_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_that_declarative_cl"
        return "vb_that_declarative_cl"
    if slots == ["NP", "V", "what", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_interrogative_cl"
        elif particle is not None:
            return f"vb_prt{particle}_interrogative_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_interrogative_cl"
        return "vb_interrogative_cl"
    if slots == ["NP", "V", "how", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_exclamative_cl"
        elif particle is not None:
            return f"vb_prt{particle}_exclamative_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_exclamative_cl"
        return "vb_exclamative_cl"
    if slots == ["NP", "V", "S-Quote"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_prt{particle}_prp{preposition}_quot_cl"
        elif particle is not None:
            return f"vb_prt{particle}_quot_cl"
        elif preposition is not None:
            return f"vb_prp{preposition}_quot_cl"
        return "vb_quot_cl"
    if slots == ["NP", "V", "NP"] or slots == ["It", "V", "NP"]:
        if particle is not None and preposition is not None:
            # CGEL 6.3.2 Structure V
            return f"vb_prt{particle}_prp{preposition}_o"
        elif particle is not None:
            # CGEL 6.3.2 Structure II
            return f"vb_prt{particle}_o"
        elif preposition is not None:
            # CGEL 6.1.2 Structure I
            return f"vb_prp{preposition}_o"

        return "vb_o"
    if slots == ["NP", "V", "NP", "ADJ"]:
        if particle is not None and preposition is not None:
            # CGEL 6.3.2 Structure VII
            return f"vb_o_prt{particle}_prp{preposition}_predcomp"
        elif particle is not None:
            # Not attested in general, but we allow it for completeness
            return f"vb_o_prt{particle}_predcomp"
        elif preposition is not None:
            # CGEL 6.1.2 Structure V
            return f"vb_o_prp{preposition}_predcomp"
        return "vb_o_predcomp"
    if slots == ["NP", "V", "NP", "S_INF"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_intnp_prt{particle}_prp{preposition}_to_inf_cl"
        elif particle is not None:
            return f"vb_intnp_prt{particle}_to_inf_cl"
        elif preposition is not None:
            return f"vb_intnp_prp{preposition}_to_inf_cl"
        return "vb_intnp_to_inf_cl"
    if slots == ["NP", "V", "NP", "S_BARE_INF"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_intnp_prt{particle}_prp{preposition}_bare_inf_cl"
        elif particle is not None:
            return f"vb_intnp_prt{particle}_bare_inf_cl"
        elif preposition is not None:
            return f"vb_intnp_prp{preposition}_bare_inf_cl"
        return "vb_intnp_bare_inf_cl"
    if slots == ["NP", "V", "NP", "S_ING"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_io_prt{particle}_prp{preposition}_vbg_cl"
        elif particle is not None:
            return f"vb_io_prt{particle}_vbg_cl"
        elif preposition is not None:
            return f"vb_io_prp{preposition}_vbg_cl"
        return "vb_io_vbg_cl"
    if slots == ["NP", "V", "NP", "VP_VBN"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_io_prt{particle}_prp{preposition}_vbn_cl"
        elif particle is not None:
            return f"vb_io_prt{particle}_vbn_cl"
        elif preposition is not None:
            return f"vb_io_prp{preposition}_vbn_cl"
        return "vb_io_vbn_cl"
    if slots == ["NP", "V", "NP", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_io_prt{particle}_prp{preposition}_bare_declarative_cl"
        elif particle is not None:
            return f"vb_io_prt{particle}_bare_declarative_cl"
        elif preposition is not None:
            return f"vb_io_prp{preposition}_bare_declarative_cl"
        return "vb_io_bare_declarative_cl"
    if slots == ["NP", "V", "NP", "that", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_io_prt{particle}_prp{preposition}_that_declarative_cl"
        elif particle is not None:
            return f"vb_io_prt{particle}_that_declarative_cl"
        elif preposition is not None:
            return f"vb_io_prp{preposition}_that_declarative_cl"
        return "vb_io_that_declarative_cl"
    if slots == ["NP", "V", "NP", "what", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_io_prt{particle}_prp{preposition}_interrogative_cl"
        elif particle is not None:
            return f"vb_io_prt{particle}_interrogative_cl"
        elif preposition is not None:
            return f"vb_io_prp{preposition}_interrogative_cl"
        return "vb_io_interrogative_cl"
    if slots == ["NP", "V", "NP", "how", "S"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_io_prt{particle}_prp{preposition}_exclamative_cl"
        elif particle is not None:
            return f"vb_io_prt{particle}_exclamative_cl"
        elif preposition is not None:
            return f"vb_io_prp{preposition}_exclamative_cl"
        return "vb_io_exclamative_cl"
    if slots == ["NP", "V", "NP", "S-Quote"]:
        # not attested in CGEL, but we allow it for completeness
        if particle is not None and preposition is not None:
            return f"vb_io_prt{particle}_prp{preposition}_quot_cl"
        elif particle is not None:
            return f"vb_io_prt{particle}_quot_cl"
        elif preposition is not None:
            return f"vb_io_prp{preposition}_quot_cl"
        return "vb_io_quot_cl"
    if slots == ["NP", "V", "NP", "NP"]:
        if particle is not None and preposition is not None:
            # CGEL 6.3.2 Structure V
            return f"vb_o_prt{particle}_prp{preposition}_o"
        elif particle is not None:
            # CGEL 6.3.2 Structure III
            return f"vb_o_prt{particle}_o"
        elif preposition is not None:
            # CGEL 6.1.2 Structure II
            return f"vb_o_prp{preposition}_o"
        return "vb_io_do"
    return None


def extract_verb_categories() -> dict[str, dict[str, None]]:
    """Parse all VerbNet JSON files under each directory in *VERBNET_DIRS* and
    build verb sets per coarse syntactic category compatible with our grammar.

    Phrasal verbs (containing double underscores like "sign__up") are split into:
    - main verb: "sign"
    - particle: "up"
    The particle is collected separately, and the verb category is transformed
    to its particle variant (e.g., vb_to_inf_cl -> vb_prt_to_inf_cl).
    """
    # Use defaultdict so categories appear lazily when first encountered
    categories: dict[str, set[str]] = defaultdict(set)

    for verb_dir in VERBNET_DIRS:
        if not verb_dir.exists():
            # Skip missing directories so the script can run even if some
            # optional sources are absent.
            continue
        for fp in verb_dir.glob("*.json"):
            data = json.loads(fp.read_text())
            members = [m.lower() for m in data.get("members", [])]
            for frame in data.get("frames", []):
                slots = _normalize_primary(frame["primary"])

                for verb in members:
                    main_verb = None
                    particle = None
                    preposition = None

                    # split by double underscore and then by single underscore
                    # Ex: "let__in_on" -> [["let"], ["in", "on"]]
                    match [x.split("_") for x in verb.split("__")]:
                        case [[main_verb], [particle, preposition]]:
                            pass
                        case [[main_verb], [particle]]:
                            pass
                        case [[main_verb, preposition]]:
                            pass
                        case [[main_verb]]:
                            pass

                    if main_verb is not None:
                        cat = cat_from_primary(slots, particle, preposition)
                        if cat is not None:
                            categories[cat].add(main_verb)

    # Convert to regular dict[cat] -> {verb: None, ...}
    # Any category that never received members simply won't appear.
    verbs = {cat: {v: None for v in sorted(vset)} for cat, vset in categories.items()}

    return verbs


# ---------------------------------------------------------------------------
# Resolve noun classes via graph reachability
# ---------------------------------------------------------------------------

NOUNS_DIR = Path("nouns")


def load_raw_noun_files() -> dict[str, dict]:
    """Load every *.json in nouns/ and return mapping of filename -> json dict."""
    raw = {}
    for fp in NOUNS_DIR.glob("*.json"):
        raw[fp.name] = json.loads(fp.read_text())
    return raw


def resolve_nouns(raw: dict[str, dict]) -> dict[str, set[str]]:
    """Resolve transitive inclusion of classes to produce full word sets."""

    cache: dict[str, set[str]] = {}

    def dfs(fname: str, stack: set[str]) -> set[str]:
        """Depth-first traversal that accumulates words while checking
        countability compatibility between including and included classes.

        A class may optionally specify a boolean "countable" property. If both
        the including class *fname* **and** an included class specify this
        property explicitly and their values differ, we raise a
        ValueError – this signals inconsistent modelling in the noun
        hierarchy.
        """

        if fname in cache:
            return cache[fname]
        if fname in stack:
            # Cycle detected – ignore to prevent infinite recursion.
            return set()
        stack.add(fname)

        data = raw.get(fname, {})
        words = set(data.get("words", {}).keys())
        parent_countable = data.get("countable")  # True / False / None

        for inc in data.get("classes", []):
            # normalise inc to filename (ensure endswith .json)
            inc_file = inc if inc.endswith(".json") else inc + ".json"

            inc_countable = raw.get(inc_file, {}).get("countable")
            # Both sides explicit → must match
            if (
                parent_countable in (True, False)
                and inc_countable in (True, False)
                and parent_countable != inc_countable
            ):
                raise ValueError(
                    f"Countability mismatch: '{fname}' (countable={parent_countable}) "
                    f"includes '{inc_file}' (countable={inc_countable})"
                )

            words |= dfs(inc_file, stack)

        stack.remove(fname)
        cache[fname] = words
        return words

    resolved: dict[str, set[str]] = {}
    for fname in raw:
        resolved[fname] = dfs(fname, set())
    return resolved


# ---------------------------------------------------------------------------
# Build english_json
# ---------------------------------------------------------------------------

indeclinable = json.loads(Path("indeclinable.json").read_text())

# Derive verb categories from VerbNet
verbs = extract_verb_categories()

english_json: dict[str, dict[str, None]] = {}

# 1. Indeclinable categories (determiners, conjunctions, etc.)
for kind in indeclinable:
    english_json[kind] = deepcopy(indeclinable[kind])


# ---------------------------------------------------------------------------
# 1c. Adjective classes (from adjectives/ folder)
# ---------------------------------------------------------------------------
ADJECTIVES_DIR = Path("adjectives")
adjective_words: set[str] = set()
for fp in ADJECTIVES_DIR.glob("*.json"):
    data = json.loads(fp.read_text())
    words = data.get("words", {}).keys()
    for cls in data.get("classes", []):
        english_json.setdefault(cls, {})
        for w in words:
            english_json[cls][w] = None
            adjective_words.add(w)

# 2. Noun classes (from nouns/ folder)
raw_noun_data = load_raw_noun_files()
resolved_nouns = resolve_nouns(raw_noun_data)

# Initialise aggregate noun classes
english_json["noun_sg"] = {}
english_json["noun_pl"] = {}
english_json["countable_noun"] = {}
english_json["uncountable_noun"] = {}

for fname, words in resolved_nouns.items():
    class_name = Path(fname).stem  # e.g., tools_countable
    english_json[class_name] = {w: None for w in sorted(words)}

    # Determine countability from the file's metadata. Only when explicitly
    # marked as countable do we add plural forms.
    is_countable = raw_noun_data.get(fname, {}).get("countable")

    for w in words:
        english_json["noun_sg"][w] = None
        english_json["noun_pl"][noun_to_noun_pl(w)] = None

    # If explicitly marked countable add plural forms and update global class
    if is_countable is True:
        for w in words:
            english_json[class_name][noun_to_noun_pl(w)] = None

            # Aggregate into countable_noun set (both singular & plural)
            english_json["countable_noun"][w] = None
            english_json["countable_noun"][noun_to_noun_pl(w)] = None

    elif is_countable is False:
        # Aggregate uncountable nouns
        for w in words:
            english_json["uncountable_noun"][w] = None

# 3. Verb classes and their inflections
for kind in verbs:
    # derive other forms from dictionary sets
    english_json[kind.replace("vb", "inf", 1)] = {
        dict_to_inf(v): None for v in verbs[kind] if dict_to_inf(v) is not None
    }
    english_json[kind.replace("vb", "vbd", 1)] = {
        dict_to_vbd(v): None for v in verbs[kind] if dict_to_vbd(v) is not None
    }
    english_json[kind.replace("vb", "vbn", 1)] = {
        dict_to_vbn(v): None for v in verbs[kind] if dict_to_vbn(v) is not None
    }
    english_json[kind.replace("vb", "vbg", 1)] = {
        dict_to_vbg(v): None for v in verbs[kind] if dict_to_vbg(v) is not None
    }
    english_json[kind.replace("vb", "vbz", 1)] = {
        dict_to_vbz(v): None for v in verbs[kind] if dict_to_vbz(v) is not None
    }
    english_json[kind.replace("vb", "vbp", 1)] = {
        dict_to_vbp(v): None for v in verbs[kind] if dict_to_vbp(v) is not None
    }
    # combine finite forms for convenience
    english_json[kind.replace("vb", "vbf_sg", 1)] = (
        english_json[kind.replace("vb", "vbd", 1)]
        | english_json[kind.replace("vb", "vbz", 1)]
    )
    english_json[kind.replace("vb", "vbf_pl", 1)] = (
        english_json[kind.replace("vb", "vbd", 1)]
        | english_json[kind.replace("vb", "vbp", 1)]
    )


# ---------------------------------------------------------------------------
# 3b. Adverb classes (from adverbs/ folder)
# ---------------------------------------------------------------------------
ADVERBS_DIR = Path("adverbs")
for fp in ADVERBS_DIR.glob("*.json"):
    data = json.loads(fp.read_text())
    words = data.get("words", {}).keys()
    for cls in data.get("classes", []):
        # Ensure the class dictionary exists
        english_json.setdefault(cls, {})
        for w in words:
            english_json[cls][w] = None

# ---------------------------------------------------------------------------
# 3c. Derived adverbs from adjectives
# ---------------------------------------------------------------------------
english_json.setdefault("adv", {})
english_json.setdefault("adv_vp", {})
for adj in adjective_words:
    adv = adjective_to_adverb(adj)
    english_json["adv"][adv] = None
    english_json["adv_vp"][adv] = None

# ---------------------------------------------------------------------------
# 4. Preposition classes (from prepositions/ folder)
# ---------------------------------------------------------------------------
english_json["preposition"] = {}
PREPOSITIONS_DIR = Path("prepositions")
for fp in PREPOSITIONS_DIR.glob("*.json"):
    data = json.loads(fp.read_text())
    words = data.get("words", {}).keys()
    for cls in data.get("classes", []):
        english_json.setdefault(cls, {})
        for w in words:
            english_json[cls][w] = None

# ---------------------------------------------------------------------------
# Transpose: word -> list-of-classes
# ---------------------------------------------------------------------------

transposed: dict[str, set[str]] = {}
for kind, words in english_json.items():
    for word in words:
        # lowercase all words and avoid duplicate class entries
        transposed.setdefault(word.lower(), set()).add(kind)

# Convert each set to a sorted list and sort words alphabetically for consistent JSON output
transposed = {
    word: sorted(list(classes)) for word, classes in sorted(transposed.items())
}

# Write output
args.output.write_text(json.dumps(transposed, indent=4))
print(f"Wrote {args.output} with {len(transposed)} unique words.")
