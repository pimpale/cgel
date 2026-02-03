import json

# extract particles and prepositions from english.json
import re

with open("english.json", "r") as f:
    english = json.load(f)
    classes_set = set(x for classes in english.values() for x in classes)    
    # Extract unique (particle, (preposition, constituent)) pairs from each class
    # Either may be None if not present in the class
    # pp is captured as a tuple (preposition, constituent) e.g. ("for", "np"), ("as", "predcomp")
    # constituent can have underscores (e.g. "to_inf_cl"), so we capture till end of string
    particle_pp_pairs = sorted(set(
        (
            prt_match.group(1) if (prt_match := re.search(r'_prt([a-z]+)', cls)) else None,
            (prp_match.group(1), prp_match.group(2)) if (prp_match := re.search(r'_prp([a-z]+)_(.+)$', cls)) else None
        )
        for cls in classes_set
        if re.search(r'_prt[a-z]|_prp[a-z]', cls)  # only include classes with at least one
    ), key=lambda x: (x[0] or '', x[1] or ('', '')))


    # extract particles
    particles = sorted(set(x[0] for x in particle_pp_pairs if x[0] is not None))
    # extract unique (preposition, constituent) tuples, e.g. ("for", "np"), ("as", "predcomp")
    pps = sorted(set(x[1] for x in particle_pp_pairs if x[1] is not None))
    # extract just the prepositions
    prepositions = sorted(set(pp[0] for pp in pps))


output = ""

output += """@preprocessor module

@{%
import english from './english.json';

function isPoS(pos) {
  return {test: word => (english[word] ?? ["proper_noun_sg"]).includes(pos)}
}

function isAllOfPoS(pos_arr) {
  return {test: word => pos_arr.every(pos => (english[word]??["proper_noun_sg"]).includes(pos))}
}

// parts of speech
const determinative = isPoS("determinative");
const dp_modifier = isPoS("dp_modifier");
const pronoun_sg = isPoS("pronoun_sg");
const pronoun_pl = isPoS("pronoun_pl");
const independent_genitive_pronoun = isPoS("independent_genitive_pronoun");
const dependent_genitive_pronoun = isPoS("dependent_genitive_pronoun");
const proper_noun_sg = isPoS("proper_noun_sg");
const proper_noun_pl = isPoS("proper_noun_pl");
const noun_sg = isPoS("noun_sg");
const noun_pl = isPoS("noun_pl");
const preposition = isPoS("preposition");
const preposition_np = isPoS("preposition_np");
const preposition_predcomp = isPoS("preposition_predcomp");
const preposition_bare_declarative_cl = isPoS("preposition_bare_declarative_cl");
const preposition_pp = isPoS("preposition_pp");
const preposition_advp = isPoS("preposition_advp");

// correlatives
const either = isPoS("either");
const neither = isPoS("neither");
const both = isPoS("both");

// coordinators
const and = isPoS("and");
const or = isPoS("or");
const but = isPoS("but");
const nor = isPoS("nor");

// particles
const to = isPoS("to");
const s = isPoS("s");
const not = isPoS("not");
const not_onlyable = isPoS("not_onlyable");
const that = isPoS("that");
const interrogative_subordinator = isPoS("interrogative_subordinator");
const how = isPoS("how");
const why = isPoS("why");
const who = isPoS("who");
const whose = isPoS("whose");
const what = isPoS("what");
const where = isPoS("where");
const when = isPoS("when");
const which = isPoS("which");

const else_word = isPoS("else");
const whatever = isPoS("whatever");
const whichever = isPoS("whichever");
const whoever = isPoS("whoever");

// punctuation
const period = isPoS("period");
const question_mark = isPoS("question_mark");
const exclamation_mark = isPoS("exclamation_mark");
const comma = isPoS("comma");
const quotation_mark = isPoS("quotation_mark");

// verbs

// Modal (MODAL)
const modal = isPoS("modal");
"""

for particle in particles:
    output += f"""
const prt{particle} = {{ test: word => word == "{particle}" }};
"""

for preposition in prepositions:
    output += f"""
const prp{preposition} = {{ test: word => word == "{preposition}" }};
"""

# define the verbs
# NOTE: not all of these are attested in english, but we define them all to avoid errors
# other parts of the grammar may not account for these types
for vp_type in ["inf", "vbg", "vbn", "vbf_sg", "vbf_pl"]:
    output += f"""
const {vp_type} = isPoS("{vp_type}");
const {vp_type}_predcomp = isPoS("{vp_type}_predcomp");
const {vp_type}_to_inf_cl = isPoS("{vp_type}_to_inf_cl");
const {vp_type}_bare_inf_cl = isPoS("{vp_type}_bare_inf_cl");
const {vp_type}_that_declarative_cl = isPoS("{vp_type}_that_declarative_cl");
const {vp_type}_bare_declarative_cl = isPoS("{vp_type}_bare_declarative_cl");
const {vp_type}_exclamative_cl = isPoS("{vp_type}_exclamative_cl");
const {vp_type}_interrogative_cl = isPoS("{vp_type}_interrogative_cl");
const {vp_type}_quot_cl = isPoS("{vp_type}_quot_cl");
const {vp_type}_vbg_cl = isPoS("{vp_type}_vbg_cl");
const {vp_type}_vbn_cl = isPoS("{vp_type}_vbn_cl");
const {vp_type}_passive_cl = isPoS("{vp_type}_passive_cl");
const {vp_type}_o = isPoS("{vp_type}_o");
const {vp_type}_o_predcomp = isPoS("{vp_type}_o_predcomp");
const {vp_type}_intnp_to_inf_cl = isPoS("{vp_type}_intnp_to_inf_cl");
const {vp_type}_intnp_bare_inf_cl = isPoS("{vp_type}_intnp_bare_inf_cl");
const {vp_type}_io_that_declarative_cl = isPoS("{vp_type}_io_that_declarative_cl");
const {vp_type}_io_bare_declarative_cl = isPoS("{vp_type}_io_bare_declarative_cl");
const {vp_type}_io_exclamative_cl = isPoS("{vp_type}_io_exclamative_cl");
const {vp_type}_io_interrogative_cl = isPoS("{vp_type}_io_interrogative_cl");
const {vp_type}_io_quot_cl = isPoS("{vp_type}_io_quot_cl");
const {vp_type}_io_do = isPoS("{vp_type}_io_do");
    """
    for particle in particles:
        output += f"""
const {vp_type}_prt{particle} = isPoS("{vp_type}_prt{particle}");
const {vp_type}_prt{particle}_predcomp = isPoS("{vp_type}_prt{particle}_predcomp");
const {vp_type}_prt{particle}_to_inf_cl = isPoS("{vp_type}_prt{particle}_to_inf_cl");
const {vp_type}_prt{particle}_vbg_cl = isPoS("{vp_type}_prt{particle}_vbg_cl");
const {vp_type}_prt{particle}_that_declarative_cl = isPoS("{vp_type}_prt{particle}_that_declarative_cl");
const {vp_type}_prt{particle}_bare_declarative_cl = isPoS("{vp_type}_prt{particle}_bare_declarative_cl");
const {vp_type}_prt{particle}_interrogative_cl = isPoS("{vp_type}_prt{particle}_interrogative_cl");
const {vp_type}_prt{particle}_o = isPoS("{vp_type}_prt{particle}_o");
const {vp_type}_o_prt{particle}_predcomp = isPoS("{vp_type}_o_prt{particle}_predcomp");
const {vp_type}_io_prt{particle}_that_declarative_cl = isPoS("{vp_type}_io_prt{particle}_that_declarative_cl");
const {vp_type}_io_prt{particle}_bare_declarative_cl = isPoS("{vp_type}_io_prt{particle}_bare_declarative_cl");
const {vp_type}_io_prt{particle}_o = isPoS("{vp_type}_io_prt{particle}_o");
"""

    for preposition, constituent in pps:
        output += f"""
const {vp_type}_prp{preposition}_{constituent} = isPoS("{vp_type}_prp{preposition}_{constituent}");
const {vp_type}_o_prp{preposition}_{constituent} = isPoS("{vp_type}_o_prp{preposition}_{constituent}");
"""

    for particle, pp in particle_pp_pairs:
        if particle is None or pp is None:
            continue
        preposition, constituent = pp
        output += f"""
const {vp_type}_prt{particle}_prp{preposition}_{constituent} = isPoS("{vp_type}_prt{particle}_prp{preposition}_{constituent}");
const {vp_type}_o_prt{particle}_prp{preposition}_{constituent} = isPoS("{vp_type}_o_prt{particle}_prp{preposition}_{constituent}");
"""

# for the finite verbs, we also use them as auxiliaries
for vp_type in ["vbf_sg", "vbf_pl"]:
    output += f"""
const aux_{vp_type}_predcomp = isAllOfPoS(["{vp_type}_predcomp", "aux"]);
const aux_{vp_type}_o = isAllOfPoS(["{vp_type}_o", "aux"]);
const aux_{vp_type}_vbg_cl = isAllOfPoS(["{vp_type}_vbg_cl", "aux"]);
const aux_{vp_type}_vbn_cl = isAllOfPoS(["{vp_type}_vbn_cl", "aux"]);
const aux_{vp_type}_passive_cl = isAllOfPoS(["{vp_type}_passive_cl", "aux"]);
const aux_{vp_type}_bare_inf_cl = isAllOfPoS(["{vp_type}_bare_inf_cl", "aux"]);"""

output += """

// certain nouns with special treatment
const times = isPoS("times");
const cardinal_number_eng = isPoS("cardinal_number_eng");
const digits = { test: word => !isNaN(word) };
const fraction_denominator = isPoS("fraction_denominator");

// adjectives
const adj = isPoS("adj");
const adj_pp = isPoS("adj_pp");
const adj_that_declarative_cl = isPoS("adj_that_declarative_cl");
const adj_bare_declarative_cl = isPoS("adj_bare_declarative_cl");
const adj_to_inf_cl = isPoS("adj_to_inf_cl");

// adverbs
const adv = isPoS("adv");
const adv_vp = isPoS("adv_vp");
const precorenp_modifier = isPoS("precorenp_modifier");
const postcorenp_modifier = isPoS("postcorenp_modifier");
const quantificational_modifier = isPoS("quantificational_modifier");
const precore_emphatic_modifier = isPoS("precore_emphatic_modifier");
const precore_emphatic_modifier_adjp  = isPoS("precore_emphatic_modifier_adjp ");

// define postprocessors

// nonterminal 
function nt(kind) {
    return (children) => ({kind, children});
}

// nonterminal 
function nonterminal_unpack(kind) {
    return ([children]) => ({kind, children});
}

// terminal
function t(kind) {
    return ([value]) => ({kind, children: value});
}

%}

text -> sentence:* {%nonterminal_unpack("text")%}

sentence -> 
      fin_cl period {%nt("sentence")%}
    | fin_cl exclamation_mark {%nt("sentence")%}
    | displaced_quot_cl period {%nt("sentence")%}
    | displaced_quot_cl exclamation_mark {%nt("sentence")%}
    | question_cl question_mark {%nt("sentence")%}


# comma-separated list for syndetic coordination: "X, Y," (requires 2+ items to avoid ambiguity with binary)
fin_cl_coordlist -> fin_cl_coordlist_item fin_cl_coordlist_ {%nt("fin_cl_coordlist")%}
fin_cl_coordlist_ -> fin_cl_coordlist_item:+ {%nonterminal_unpack("fin_cl_coordlist_")%}
fin_cl_coordlist_item -> fin_cl comma {%nt("fin_cl_coordlist_item")%}

# and-separated list for polysyndetic and: "X and Y and" (requires 2+ items to avoid ambiguity with binary)
fin_cl_and_coordlist -> fin_cl_and_coordlist_item fin_cl_and_coordlist_ {%nt("fin_cl_and_coordlist")%}
fin_cl_and_coordlist_ -> fin_cl_and_coordlist_item:+ {%nonterminal_unpack("fin_cl_and_coordlist_")%}
fin_cl_and_coordlist_item -> fin_cl and {%nt("fin_cl_and_coordlist_item")%}

# or-separated list for polysyndetic or: "X or Y or" (requires 2+ items to avoid ambiguity with binary)
fin_cl_or_coordlist -> fin_cl_or_coordlist_item fin_cl_or_coordlist_ {%nt("fin_cl_or_coordlist")%}
fin_cl_or_coordlist_ -> fin_cl_or_coordlist_item:+ {%nonterminal_unpack("fin_cl_or_coordlist_")%}
fin_cl_or_coordlist_item -> fin_cl or {%nt("fin_cl_or_coordlist_item")%}

# a declarative finite clause
fin_cl -> 
# ===== 1. AND =====
# 1a. asyndetic (no coordinator): "I came, I saw, I conquered"
      fin_cl_coordlist fin_cl {%nt("fin_cl")%}
# 1b. syndetic
#   1b-i. binary: "X and Y"
    | fin_cl and fin_cl {%nt("fin_cl")%}
#   1b-ii. list: "X, Y, and Z"
    | fin_cl_coordlist and fin_cl {%nt("fin_cl")%}
# 1c. polysyndetic
#   1c-i. list: "X and Y and Z"
    | fin_cl_and_coordlist fin_cl {%nt("fin_cl")%}
# ===== 2. BOTH-AND (not allowed for main clauses) =====
# *both he overslept and his bus arrived late
# ===== 3. OR =====
# 3b. syndetic
#   3b-i. binary: "X or Y"
    | fin_cl or fin_cl {%nt("fin_cl")%}
#   3b-ii. list: "X, Y, or Z"
    | fin_cl_coordlist or fin_cl {%nt("fin_cl")%}
# 3c. polysyndetic
#   3c-i. list: "X or Y or Z"
    | fin_cl_or_coordlist fin_cl {%nt("fin_cl")%}
# ===== 4. EITHER-OR =====
# 4b. syndetic
#   4b-i. binary: "either X or Y"
    | either fin_cl or fin_cl {%nt("fin_cl")%}
#   4b-ii. list: "either X, Y, or Z"
    | either fin_cl_coordlist or fin_cl {%nt("fin_cl")%}
# 4c. polysyndetic
#   4c-i. list: "either X or Y or Z"
    | either fin_cl_or_coordlist fin_cl {%nt("fin_cl")%}
# ===== 5. NOR (requires inversion) =====
# 5b. syndetic
#   5b-i. binary: "He won't go, nor will I"
    | fin_cl comma nor subj_aux_inv_cl {%nt("fin_cl")%}
# ===== 6. NEITHER-NOR (not allowed for main clauses) =====
# *neither he overslept nor his bus arrived late
# ===== 7. BUT =====
# 7b. syndetic
#   7b-i. binary only: "X but Y"
    | fin_cl but fin_cl {%nt("fin_cl")%}
# ===== 8. NOT ONLY - (BUT) (requires inversion after "not only", "but" is optional) =====
# 8b. syndetic
#   8b-i. binary: "Not only did he oversleep, but his bus arrived late"
#                 "Not only was he incompetent, he was also corrupt" (unknown whether this is asyndetic or just a case of juxtaposition. See CGEL 15.2.7 for more details.)
    | not_only subj_aux_inv_cl comma but fin_cl {%nt("fin_cl")%}
    | not_only subj_aux_inv_cl comma fin_cl {%nt("fin_cl")%}
# ===== terminal rules =====
    | precl_adjunct_list np_sg vbf_sg_vp {%nt("fin_cl")%}
    | precl_adjunct_list np_pl vbf_pl_vp {%nt("fin_cl")%}

precl_adjunct_list -> adjunct_list          {%nt("precl_adjunct_list")%}
                    | adjunct_list comma    {%nt("precl_adjunct_list")%}


# examples:
# "I am happy", bob said.
# "I am happy", he told them.
# "I am happy", said bob.
displaced_quot_cl -> null {%nt("displaced_quot_cl")%}



quot_cl -> quotation_mark text quotation_mark {%nt("quot")%}

# a question clause
question_cl ->
# yes no qs
                                       subj_aux_inv_cl               {%nt("question_cl")%} # is he happy?
# interrogative phrase replaces np
    | ip_np                            subj_aux_inv_cl_minus_np      {%nt("question_cl")%} # what did he eat?
    | ip_np_sg                         vbf_sg_vp                     {%nt("question_cl")%} # who hunts the deer?
    | ip_np_pl                         vbf_pl_vp                     {%nt("question_cl")%} # which people hunt the deer?
# interrogative phrase replaces adjunct of time, place or reason, also can be used if a preposition is frontend
    | ip_pp                            subj_aux_inv_cl            {%nt("question_cl")%} # where did you eat? / why did you eat? / after which class will you be free?
# interrogative phrase replaces advp_vp 
    | ip_advp_vp                    subj_aux_inv_cl            {%nt("question_cl")%} # how (quickly) did you eat the apple?
# interrogative phrase replaces advp
    | ip_adjp                       subj_aux_inv_cl_minus_adjp {%nt("question_cl")%} # how happy did mary become?

subj_aux_inv_cl ->
# modal
      modal                  np adjunct_list_bare_inf_cl      {%nt("subj_aux_inv_cl")%} # can you eat?
# finite singular
    | aux_vbf_sg_predcomp    np_sg adjunct_list_predcomp      {%nt("subj_aux_inv_cl")%} # is he happy? (`be` when used as a copula)
    | aux_vbf_sg_o           np_sg adjunct_list_o             {%nt("subj_aux_inv_cl")%} # is he a watchman? (`be` when used as an equative)
    | aux_vbf_sg_vbg_cl      np_sg vbg_cl                     {%nt("subj_aux_inv_cl")%} # is he eating? (`be` when used to mark progressive aspect)
    | aux_vbf_sg_vbn_cl      np_sg vbn_cl                     {%nt("subj_aux_inv_cl")%} # has he eaten? (`have` when used to mark past tense)
    | aux_vbf_sg_passive_cl  np_sg passive_cl                 {%nt("subj_aux_inv_cl")%} # is he eaten? (`be` when used to mark passive voice)
    | aux_vbf_sg_bare_inf_cl np_sg adjunct_list_bare_inf_cl   {%nt("subj_aux_inv_cl")%} # does he eat?
# finite plural
    | aux_vbf_pl_predcomp    np_pl adjunct_list_predcomp      {%nt("subj_aux_inv_cl")%} # are you happy? (`be` when used as a copula)
    | aux_vbf_pl_o           np_pl adjunct_list_o             {%nt("subj_aux_inv_cl")%} # are you a watchman? (`be` when used as an equative)
    | aux_vbf_pl_vbg_cl      np_pl vbg_cl                     {%nt("subj_aux_inv_cl")%} # are you eating? (`be` when used to mark progressive aspect)
    | aux_vbf_pl_vbn_cl      np_pl vbn_cl                     {%nt("subj_aux_inv_cl")%} # have you eaten? (`have` when used to mark past tense)
    | aux_vbf_pl_passive_cl  np_pl passive_cl                 {%nt("subj_aux_inv_cl")%} # are you eaten? (`be` when used to mark passive voice)
    | aux_vbf_pl_bare_inf_cl np_pl adjunct_list_bare_inf_cl   {%nt("subj_aux_inv_cl")%} # do you eat?

# note, no moves from head here
subj_aux_inv_cl_minus_np ->
# modal (move from argument)
      modal                    np adjunct_list_bare_inf_cl_minus_np      {%nt("subj_aux_inv_cl_minus_np")%} # what [can you sing]?
# finite singular (move from argument)
    | aux_vbf_sg_predcomp      np_sg adjunct_list_predcomp_minus_np      {%nt("subj_aux_inv_cl_minus_np")%} # what [is he happy to be]? (`be` when used as a copula)
    | aux_vbf_sg_o             np_sg adjunct_list_o_minus_np             {%nt("subj_aux_inv_cl_minus_np")%} # what [is he]? (`be` when used as an equative)
    | aux_vbf_sg_vbg_cl        np_sg vbg_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [is he eating]?
    | aux_vbf_sg_vbn_cl        np_sg vbn_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [has he eaten]?
    | aux_vbf_sg_passive_cl    np_sg passive_cl_minus_np                 {%nt("subj_aux_inv_cl_minus_np")%} # what [is he given]?
    | aux_vbf_sg_bare_inf_cl   np_sg adjunct_list_bare_inf_cl_minus_np   {%nt("subj_aux_inv_cl_minus_np")%} # what [doesn't he eat]?
# finite plural (move from argument)
    | aux_vbf_pl_predcomp      np_pl adjunct_list_predcomp_minus_np      {%nt("subj_aux_inv_cl_minus_np")%} # what [are you happy to be]? (`be` when used as a copula)
    | aux_vbf_pl_o             np_pl adjunct_list_o_minus_np             {%nt("subj_aux_inv_cl_minus_np")%} # what [are you]? (`be` when used as an equative)
    | aux_vbf_pl_vbg_cl        np_pl vbg_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [are you eating]?
    | aux_vbf_pl_vbn_cl        np_pl vbn_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [have you eaten]?
    | aux_vbf_pl_passive_cl    np_pl passive_cl_minus_np                 {%nt("subj_aux_inv_cl_minus_np")%} # what [are you given]?
    | aux_vbf_pl_bare_inf_cl   np_pl adjunct_list_bare_inf_cl_minus_np   {%nt("subj_aux_inv_cl_minus_np")%} # what [don't you eat]?

subj_aux_inv_cl_minus_adjp ->
      modal                    np adjunct_list_bare_inf_cl_minus_adjp    {%nt("subj_aux_inv_cl_minus_adjp")%} # how [can you seem]?
# finite singular (move from argument)
    | aux_vbf_sg_predcomp      np_sg adjunct_list_predcomp_minus_adjp    {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he]? (`be` when used as a copula)
    | aux_vbf_sg_o             np_sg adjunct_list_o_minus_adjp           {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he]? (`be` when used as an equative)
    | aux_vbf_sg_vbg_cl        np_sg vbg_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he seeming]?
    | aux_vbf_sg_vbn_cl        np_sg vbn_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [has he seemed]?
    | aux_vbf_sg_passive_cl    np_sg passive_cl_minus_adjp               {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he made]?
    | aux_vbf_sg_bare_inf_cl   np_sg adjunct_list_bare_inf_cl_minus_adjp {%nt("subj_aux_inv_cl_minus_adjp")%} # how [doesn't he seem]?
# finite plural (move from argument)
    | aux_vbf_pl_predcomp      np_pl adjunct_list_predcomp_minus_adjp    {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you]? (`be` when used as a copula)
    | aux_vbf_pl_o             np_pl adjunct_list_o_minus_adjp           {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you]? (`be` when used as an equative)
    | aux_vbf_pl_vbg_cl        np_pl vbg_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you seeming]?
    | aux_vbf_pl_vbn_cl        np_pl vbn_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [have you seemed]?
    | aux_vbf_pl_passive_cl    np_pl passive_cl_minus_adjp               {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you made]?
    | aux_vbf_pl_bare_inf_cl   np_pl adjunct_list_bare_inf_cl_minus_adjp {%nt("subj_aux_inv_cl_minus_adjp")%} # how [don't you seem]?
"""


def serialize_rules(lhs: str, rules: list[str | None]) -> str:
    # eliminate nones first
    rules = [rule for rule in rules if rule is not None]
    # deduplicate while preserving order
    rules = list(dict.fromkeys(rules))

    # emit reference to impossible if no valid branches
    if not rules:
        return f"{lhs} -> impossible\n\n"

    out = f"{lhs} ->\n"
    for i, rule in enumerate(rules):
        out += f"    {rule} " if i == 0 else f"  | {rule} "
        out += f'{{%nt("{lhs}")%}}\n'
    out += "\n\n"
    return out


def adjunct_list_grammar(mv_type):
    mv_suf = "" if mv_type is None else f"_minus_{mv_type}"

    out = ""
    if mv_type is None:
        out += serialize_rules("adjunct_list", ["adjunct adjunct_list", "null"])
    else:
        out += serialize_rules(
            f"adjunct_list{mv_suf}",
            [
                # Ex mv_np: I know what he stumbled suddenly over [gap]
                # Ex mv_adjp: I know how happy he became [gap]
                f"adjunct adjunct_list{mv_suf}",
                # Ex mv_np: I know what he stumbled over [gap] suddenly
                # Ex mv_adjp: I know how happy he became [gap] after the promotion
                f"adjunct{mv_suf} adjunct_list",
            ],
        )

    out += serialize_rules(
        f"adjunct_list_predcomp{mv_suf}",
        [
            # Ex: You seemed happy yesterday
            # Ex mv_np: Which person should I seem happy in front of [gap]
            # Ex mv_adjp: I know how you seemed happy [gap] yesterday
            f"predcomp adjunct_list{mv_suf}",
            # Ex: You seemed happy yesterday
            # Ex mv_np: I know who you seemed happy to meet [gap]
            # Ex mv_adjp: I know how happy you seemed [gap]
            f"predcomp{mv_suf} adjunct_list",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_to_inf_cl{mv_suf}",
        [
            # Ex: He wanted badly to eat food
            # Ex mv_np: I know what he wanted badly to eat [gap]
            # Ex mv_adjp: I know how happy he wanted badly to become [gap]
            f"adjunct adjunct_list_to_inf_cl{mv_suf}",
            # Ex: He decided to leave the country while he was in paris
            # Ex mv_np: Which city did he decide to leave the country while he was in [gap]?
            # Ex mv_adjp: I know how badly he wanted to eat [gap]
            f"to_inf_cl adjunct_list{mv_suf}",
            # Ex: He decided in paris to leave the country
            # (marginal) Ex mv_np: Which city did he decide in [gap] to leave the country
            # Ex mv_adjp: How badly did he want [gap] to eat?
            f"adjunct{mv_suf} adjunct_list_to_inf_cl",
            # Ex: He wanted to eat today
            # Ex mv_np: I know what he wanted to eat [gap] today
            # Ex mv_adjp: I know how happy he wanted to become [gap] today
            f"to_inf_cl{mv_suf} adjunct_list",
        ],
    )

    # Note: we're missing some semi marginal cases but it's a good approximation
    out += serialize_rules(
        f"adjunct_list_bare_inf_cl{mv_suf}",
        [
            # Ex: He made you eat yesterday
            # Ex mv_np: I know what he made you eat [gap] yesterday
            # Ex mv_adjp: I know how happy he made you become [gap] yesterday
            f"bare_inf_cl{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_that_declarative_cl{mv_suf}",
        [
            # Ex: He believed that the suspect was Joe on tuesday
            # Ex mv_np: I know what day he believed that the suspect was Joe on [gap]
            # Ex mv_adjp: I know how smart he believed that she was [gap] on tuesday
            f"that_declarative_cl adjunct_list{mv_suf}",
            # Ex: He believed in Paris that the suspect was Joe
            # (marginal) Ex mv_np: Which city did he believe in [gap] that the suspect was Joe
            # Ex mv_adjp: How strongly did he believe [gap] that the suspect was Joe
            f"adjunct{mv_suf} adjunct_list_that_declarative_cl",
            # Ex: He believed that the suspect was Joe today
            # Ex mv_np: I know what he believed that the suspect was Joe [gap] today
            # Ex mv_adjp: I know how strongly he believed that the suspect was Joe [gap] today
            f"that_declarative_cl{mv_suf} adjunct_list",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_bare_declarative_cl{mv_suf}",
        [
            # Ex: He said the suspect was Joe on tuesday
            # Ex mv_np: I know what day he said the suspect was Joe on [gap]
            # Ex mv_adjp: I know how confidently he said the suspect was Joe [gap] on tuesday
            f"bare_declarative_cl adjunct_list{mv_suf}",
            # Ex: He said in Paris the suspect was Joe
            # (marginal) Ex mv_np: Which city did he say in [gap] the suspect was Joe
            # Ex mv_adjp: How confidently did he say [gap] the suspect was Joe
            f"adjunct{mv_suf} adjunct_list_bare_declarative_cl",
            # Ex: He said the suspect was Joe today
            # Ex mv_np: I know what he said the suspect was [gap] today
            # Ex mv_adjp: I know how confidently he said the suspect was Joe [gap] today
            f"bare_declarative_cl{mv_suf} adjunct_list",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_exclamative_cl{mv_suf}",
        [
            # Ex: He exclaimed how tall she was on tuesday
            # Ex mv_np: I know what day he exclaimed how tall she was on [gap]
            # Ex mv_adjp: I know how eager he exclaimed how tall she was [gap] to tell everyone
            f"exclamative_cl adjunct_list{mv_suf}",
            # Ex: He exclaimed in Paris how tall she was
            # Ex mv_np: Which city did he exclaim in [gap] how tall she was
            # Ex mv_adjp: How loudly did he exclaim [gap] how tall she was
            f"adjunct{mv_suf} adjunct_list_exclamative_cl",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_interrogative_cl{mv_suf}",
        [
            # Ex: He asked whether Joe left on tuesday
            # Ex mv_np: I know what day he asked whether Joe left on [gap]
            # Ex mv_adjp: I know how eager he asked whether Joe left [gap] to find out
            f"interrogative_cl adjunct_list{mv_suf}",
            # Ex: He asked in Paris whether Joe left
            # Ex mv_np: Which city did he ask in [gap] whether Joe left
            # Ex mv_adjp: How loudly did he ask [gap] whether Joe left
            f"adjunct{mv_suf} adjunct_list_interrogative_cl",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_quot_cl{mv_suf}",
        [
            # Ex: He said "hello" on tuesday
            # Ex mv_np: I know what day he said "hello" on [gap]
            # Ex mv_adjp: I know how loudly he said "hello" [gap] on tuesday
            f"maybe_comma quot_cl adjunct_list{mv_suf}",
            # Ex: He said in Paris "hello"
            # Ex mv_np: Which city did he say in [gap] "hello"
            # Ex mv_adjp: How loudly did he say [gap] "hello"
            f"adjunct{mv_suf} adjunct_list_quot_cl",
        ],
    )

    # cannot be shifted: *I saw quickly the janitor
    out += serialize_rules(
        f"adjunct_list_o{mv_suf}",
        [
            # Ex: I saw the suspect on tuesday
            # Ex mv_np: I know what day I saw the suspect on [gap]
            # (marginal/rare) Ex mv_adjp: ADJP extraction from post-object adjuncts is very marginal
            f"np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
            # Ex: I saw the suspect today
            # Ex mv_np: I know who I saw [gap] today
            # (marginal/rare) Ex mv_adjp: ADJP extraction from post-object adjuncts is very marginal
            f"np{mv_suf} adjunct_list" if mv_type != "adjp" else None,
        ],
    )


    # can be out of order, not normally the case
    # normal: i found the janitor happy
    # shifted: i found happy the janitor with two cars and a house
    out += serialize_rules(
        f"adjunct_list_o_predcomp{mv_suf}",
        [
            # Ex: I found the suspect guilty on tuesday
            # Ex mv_np: I know what day I found the suspect guilty on [gap]
            # Ex mv_adjp: I know how guilty I found the suspect [gap] on tuesday
            f"np adjunct_list_o_predcomp{mv_suf}",
            # Ex: I found guilty the man with the knife on tuesday
            # Ex mv_np: I know what day I found guilty the man with the knife on [gap]
            # Ex mv_adjp: I know how guilty I found [gap] the man with the knife on tuesday
            f"predcomp adjunct_list_o{mv_suf}",
            # Ex: I found the suspect guilty today
            # Ex mv_np: I know who I found [gap] guilty today
            # Ex mv_adjp: I know how guilty I found the suspect [gap] today
            f"np{mv_suf} adjunct_list_predcomp",
            # Ex: I found guilty the man with the knife today
            # Ex mv_np: I know which man I found guilty [gap] today
            # (marginal/rare) Ex mv_adjp: ADJP extraction from post-object adjuncts is very marginal
            f"predcomp{mv_suf} adjunct_list_o" if mv_type != "adjp" else None,
        ],
    )

    # cannot shift:
    # - *i asked to eat the apple you
    # on the other hand, adjuncts may sit between the np and the to inf
    # - i asked you earlier to stop talking about this very long phrase
    # Note: adjuncts CANNOT appear before the NP: *He asked quickly you to leave
    out += serialize_rules(
        f"adjunct_list_intnp_to_inf_cl{mv_suf}",
        [
            # Ex: He asked you to leave on tuesday
            # Ex mv_np: I know what day he asked you to leave on [gap]
            # Ex mv_adjp: I know how happy he asked you to become [gap] on tuesday
            f"np adjunct_list_to_inf_cl{mv_suf}",
            # Ex: He asked you to leave today
            # Ex mv_np: I know who he asked [gap] to leave today
            # Ex mv_adjp: I know how happy he asked you to become [gap] today
            f"np{mv_suf} adjunct_list_to_inf_cl",
        ],
    )

    # bare inf cannot shift with the np
    # - *i made stumble the huge giant that killed the last hero
    # it sounds pretty unnatural to have an adjunct before the bare infintive (even the bare infinitive is long)
    # - *i made you earlier stop talking about this very long phrase
    out += serialize_rules(
        f"adjunct_list_intnp_bare_inf_cl{mv_suf}",
        [
            # Ex: He made you eat vegetables yesterday
            # Ex mv_np: I know what he made you eat [gap] yesterday
            # Ex mv_adjp: I know how happy he made you become [gap] yesterday
            f"np adjunct_list_bare_inf_cl{mv_suf}",
            # Ex: He made you eat vegetables today
            # Ex mv_np: I know who he made [gap] eat vegetables today
            # Ex mv_adjp: I know how happy he made you become [gap] today
            f"np{mv_suf} adjunct_list_bare_inf_cl",
        ],
    )

    # shifting possible, if a to is used:
    # - I told you earlier that we are out of grammars
    # cannot invert the declarative_cl and np tho:
    # - *I told that I ate to the person that i saw earlier
    # - *I told that I ate the person that i saw earlier
    # Note: adjuncts CANNOT appear before the IO: *He told quickly you that...
    out += serialize_rules(
        f"adjunct_list_io_that_declarative_cl{mv_suf}",
        [
            # Ex: He told you that the suspect was Joe on tuesday
            # Ex mv_np: I know what day he told you that the suspect was Joe on [gap]
            # Ex mv_adjp: I know how happy he told you that you should become [gap] on tuesday
            f"np adjunct_list_that_declarative_cl{mv_suf}",
            # Ex: He told you that the suspect was Joe today
            # Ex mv_np: I know who he told [gap] that the suspect was Joe today
            # Ex mv_adjp: I know how happy he told you that you should become [gap] today
            f"np{mv_suf} adjunct_list_that_declarative_cl",
        ],
    )

    # Note: adjuncts CANNOT appear before the IO: *He told quickly you the suspect was Joe
    out += serialize_rules(
        f"adjunct_list_io_bare_declarative_cl{mv_suf}",
        [
            # Ex: He told you the suspect was Joe on tuesday
            # Ex mv_np: I know what day he told you the suspect was Joe on [gap]
            # Ex mv_adjp: I know how happy he told you you should become [gap] on tuesday
            f"np adjunct_list_bare_declarative_cl{mv_suf}",
            # Ex: He told you the suspect was Joe today
            # Ex mv_np: I know who he told [gap] the suspect was Joe today
            # Ex mv_adjp: I know how happy he told you you should become [gap] today
            f"np{mv_suf} adjunct_list_bare_declarative_cl",
        ],
    )

    # Note: exclamatives are islands - cannot extract from inside them
    # Note: adjuncts CANNOT appear before the IO: *He told loudly you how tall she was
    out += serialize_rules(
        f"adjunct_list_io_exclamative_cl{mv_suf}",
        [
            # Ex: He told you how tall she was on tuesday
            # Ex mv_np: I know what day he told you how tall she was on [gap]
            # Ex mv_adjp: I know how eager he told you how tall she was [gap] to find out
            f"np adjunct_list_exclamative_cl{mv_suf}",
            # Ex: He told you how tall she was today
            # Ex mv_np: I know who he told [gap] how tall she was today
            # Ex mv_adjp: I know how eager he told you how tall she was [gap] today
            f"np{mv_suf} adjunct_list_exclamative_cl",
        ],
    )

    # Note: interrogatives are islands - cannot extract from inside them
    # Note: adjuncts CANNOT appear before the IO: *He asked loudly you whether Joe left
    out += serialize_rules(
        f"adjunct_list_io_interrogative_cl{mv_suf}",
        [
            # Ex: He asked you whether Joe left on tuesday
            # Ex mv_np: I know what day he asked you whether Joe left on [gap]
            # Ex mv_adjp: I know how eager he asked you whether Joe left [gap] to find out
            f"np adjunct_list_interrogative_cl{mv_suf}",
            # Ex: He asked you whether Joe left today
            # Ex mv_np: I know who he asked [gap] whether Joe left today
            # Ex mv_adjp: I know how eager he asked you whether Joe left [gap] today
            f"np{mv_suf} adjunct_list_interrogative_cl",
        ],
    )

    # Note: quotation clauses are islands - cannot extract from inside them
    # Note: adjuncts CANNOT appear before the IO: *He told loudly you "hello"
    out += serialize_rules(
        f"adjunct_list_io_quot_cl{mv_suf}",
        [
            # Ex: He told you "hello" on tuesday
            # Ex mv_np: I know what day he told you "hello" on [gap]
            # Ex mv_adjp: I know how loudly he told you "hello" [gap] on tuesday
            f"np adjunct_list_quot_cl{mv_suf}",
            # Ex: He told you "hello" today
            # Ex mv_np: I know who he told [gap] "hello" today
            # Ex mv_adjp: I know how loudly he told you "hello" [gap] today
            f"np{mv_suf} adjunct_list_quot_cl",
        ],
    )

    # Note: adjuncts CANNOT appear before the IO: *He gave quickly you the book
    out += serialize_rules(
        f"adjunct_list_io_do{mv_suf}",
        [
            # Ex: He gave you the book on tuesday
            # Ex mv_np: I know what day he gave you the book on [gap]
            # Ex mv_adjp: I know how happy he made you [gap] on tuesday
            f"np adjunct_list_o{mv_suf}",
            # Ex: He gave you the book today
            # Ex mv_np: I know what he gave you [gap] today
            # Ex mv_adjp: I know how happy he made you [gap] today
            f"np{mv_suf} adjunct_list_o",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_dative_to{mv_suf}",
        [
            # Ex: He gave the book quickly to Mary
            # Ex mv_np: I know what day he gave the book to Mary on [gap]
            # (marginal/rare) Ex mv_adjp: ADJP extraction here is marginal
            f"adjunct adjunct_list_dative_to{mv_suf}",
            # Ex: He gave the book in Paris to Mary
            # Ex mv_np: Which city did he give the book in [gap] to Mary
            # Ex mv_adjp: How quickly did he give the book [gap] to Mary
            f"adjunct{mv_suf} adjunct_list_dative_to",
            # Ex: He gave the book to Mary today
            # Ex mv_np: I know who he gave the book to [gap] today
            # (marginal/rare) Ex mv_adjp: ADJP extraction here is marginal
            f"dative_to{mv_suf} adjunct_list",
        ],
    )

    # Note: adjuncts CANNOT appear before the DO: *He gave quickly the book to Mary
    out += serialize_rules(
        f"adjunct_list_do_dative_to{mv_suf}",
        [
            # Ex: He gave the book to Mary on tuesday
            # Ex mv_np: I know what day he gave the book to Mary on [gap]
            # (marginal/rare) Ex mv_adjp: ADJP extraction here is marginal
            f"np adjunct_list_dative_to{mv_suf}",
            # Ex: He gave the book to Mary yesterday
            # Ex mv_np: I know what he gave [gap] to Mary yesterday
            # (marginal/rare) Ex mv_adjp: ADJP extraction here is marginal
            f"dative_to adjunct_list_o{mv_suf}",
            # Ex: He gave the book to Mary today
            # Ex mv_np: I know what he gave [gap] to her today
            # (marginal/rare) Ex mv_adjp: ADJP extraction here is marginal
            f"np{mv_suf} adjunct_list_dative_to",
            # Ex: He gave the book to Mary today
            # Ex mv_np: I know who he gave the book to [gap] today
            # (marginal/rare) Ex mv_adjp: ADJP extraction here is marginal
            f"dative_to{mv_suf} adjunct_list_o",
        ],
    )


    for particle in particles:
        # ##################
        # CGEL 6.3.2 Structure I + IV: intransitive particle constructions
        # ##################

        out += serialize_rules(
            f"adjunct_list_prt{particle}{mv_suf}",
            [
                # Ex: He gave in yesterday
                # Ex mv_np: I know what he gave in to [gap] (PP complement in adjunct)
                f"prt{particle} adjunct_list{mv_suf}",
            ],
        )

        # CGEL 6.3.2 Structure VI: verb – particle – PC
        out += serialize_rules(
            f"adjunct_list_prt{particle}_predcomp{mv_suf}",
            [
                # Ex: She ended up happy
                # Ex mv_np: I know who she ended up with [gap] (PP in adjunct)
                # Ex mv_adjp: I know how happy she ended up [gap]
                f"prt{particle} predcomp adjunct_list{mv_suf}",
                f"prt{particle} predcomp{mv_suf} adjunct_list",
            ],
        )

        # verb – particle – to-infinitive clause
        out += serialize_rules(
            f"adjunct_list_prt{particle}_to_inf_cl{mv_suf}",
            [
                # Ex: It turned out to be wrong
                # Ex mv_np: I know what it turned out to be [gap]
                # Ex mv_adjp: I know how wrong it turned out to be [gap]
                f"prt{particle} to_inf_cl adjunct_list{mv_suf}",
                f"prt{particle} to_inf_cl{mv_suf} adjunct_list",
            ],
        )

        # verb – particle – gerund clause
        out += serialize_rules(
            f"adjunct_list_prt{particle}_vbg_cl{mv_suf}",
            [
                # Ex: She kept on working
                # Ex mv_np: I know what she kept on doing [gap] (extraction from gerund)
                f"prt{particle} vbg_cl adjunct_list{mv_suf}",
                f"prt{particle} vbg_cl{mv_suf} adjunct_list",
            ],
        )

        # verb – particle – that-declarative clause
        out += serialize_rules(
            f"adjunct_list_prt{particle}_that_declarative_cl{mv_suf}",
            [
                # Ex: We figured out that he was lying
                # Extraction from that-clause is limited (island)
                f"prt{particle} that_declarative_cl adjunct_list{mv_suf}",
            ],
        )

        # verb – particle – bare declarative clause
        out += serialize_rules(
            f"adjunct_list_prt{particle}_bare_declarative_cl{mv_suf}",
            [
                # Ex: He made out he was sick
                # Ex mv_np: I know what he made out [gap] was broken
                f"prt{particle} bare_declarative_cl adjunct_list{mv_suf}",
                f"prt{particle} bare_declarative_cl{mv_suf} adjunct_list",
            ],
        )

        # verb – particle – interrogative clause
        out += serialize_rules(
            f"adjunct_list_prt{particle}_interrogative_cl{mv_suf}",
            [
                # Ex: I figured out what he meant
                # Ex: She worked out how to do it
                # Interrogative clauses are islands, so no extraction from inside
                f"prt{particle} interrogative_cl adjunct_list{mv_suf}",
            ],
        )

        # verb – particle – O (allows particle movement: "take off the label" / "take the label off")
        out += serialize_rules(
            f"adjunct_list_prt{particle}_o{mv_suf}",
            [
                # Particle-first order: take off the label
                # Ex: She took off the label yesterday
                # Ex mv_np: I know what she took off [gap] yesterday
                f"prt{particle} np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"prt{particle} np{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                # Particle-after order: take the label off
                # Ex: She took the label off yesterday
                # Ex mv_np: I know what she took [gap] off yesterday
                f"np prt{particle} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"np{mv_suf} prt{particle} adjunct_list" if mv_type != "adjp" else None,
            ],
        )

        # CGEL 6.3.2 Structure VII: verb – O – particle – PC
        out += serialize_rules(
            f"adjunct_list_o_prt{particle}_predcomp{mv_suf}",
            [
                # Ex: This showed him up as spineless
                # Ex mv_np: I know who this showed [gap] up as spineless
                # Ex mv_adjp: I know how spineless this showed him up as [gap]
                f"np prt{particle} predcomp adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"np prt{particle} predcomp{mv_suf} adjunct_list",
                f"np{mv_suf} prt{particle} predcomp adjunct_list" if mv_type != "adjp" else None,
            ],
        )

        # verb – O – particle – that-declarative clause
        out += serialize_rules(
            f"adjunct_list_io_prt{particle}_that_declarative_cl{mv_suf}",
            [
                # Ex: She tipped him off that the police were coming
                # Ex mv_np: I know who she tipped [gap] off that...
                f"np prt{particle} that_declarative_cl adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"np{mv_suf} prt{particle} that_declarative_cl adjunct_list" if mv_type != "adjp" else None,
            ],
        )

        # verb – O – particle – bare declarative clause
        out += serialize_rules(
            f"adjunct_list_io_prt{particle}_bare_declarative_cl{mv_suf}",
            [
                # Ex: She tipped him off the police were coming
                # Ex mv_np: I know who she tipped [gap] off the police were coming
                f"np prt{particle} bare_declarative_cl adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"np{mv_suf} prt{particle} bare_declarative_cl adjunct_list" if mv_type != "adjp" else None,
            ],
        )

        # ##################
        # CGEL 6.3.2 Structure III: ditransitive particle construction
        # ##################

        # verb – O – particle – O (two objects with particle between)
        out += serialize_rules(
            f"adjunct_list_io_prt{particle}_o{mv_suf}",
            [
                # Ex: I ran him off another copy
                # Ex mv_np: I know what I ran him off [gap]
                f"np prt{particle} np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"np prt{particle} np{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                # First NP extracted (rare but possible)
                # Ex mv_np: I know who I ran [gap] off another copy
                f"np{mv_suf} prt{particle} np adjunct_list" if mv_type != "adjp" else None,

                # particle-first order: I still have to pay back my father that loan
                # Ex mv_np: I know what I still have to pay back [gap]
                f"prt{particle} np np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"prt{particle} np np{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                # particle-after order: I still have to pay my father that loan back
                # Ex mv_np: I know what I still have to pay back [gap]
                f"np np prt{particle} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"np np{mv_suf} prt{particle} adjunct_list" if mv_type != "adjp" else None,
            ],
        )

    # ##################
    # Passive clauses
    # ##################
    # In passive voice, the original object is promoted to subject.
    # What remains after the verb is whatever was left after removing the promoted NP.

    out += serialize_rules(
        f"adjunct_list_passive_o{mv_suf}",
        [
            # Active: They saw the janitor → Passive: The janitor was seen
            # The DO is promoted to subject, only adjuncts remain
            # Ex: The janitor was seen on tuesday
            # Ex mv_np: I know what day the janitor was seen on [gap]
            # (marginal/rare) Ex mv_adjp: ADJP extraction from post-verb adjuncts is very marginal
            f"adjunct_list{mv_suf}" if mv_type != "adjp" else None,
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_o_predcomp{mv_suf}",
        [
            # Active: They found the janitor happy → Passive: The janitor was found happy
            # The DO is promoted to subject, the predcomp + adjuncts remain
            # Ex: The janitor was found guilty on tuesday
            # Ex mv_np: I know what day the janitor was found guilty on [gap]
            # Ex mv_adjp: I know how guilty the janitor was found [gap] on tuesday
            f"adjunct_list_predcomp{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_intnp_to_inf_cl{mv_suf}",
        [
            # Active: They asked you to leave → Passive: You were asked to leave
            # The NP is promoted to subject, the to-infinitive + adjuncts remain
            # Ex: You were asked to leave on tuesday
            # Ex mv_np: I know what day you were asked to leave on [gap]
            # Ex mv_adjp: I know how happy you were asked to become [gap] on tuesday
            f"adjunct_list_to_inf_cl{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_io_that_declarative_cl{mv_suf}",
        [
            # Active: They told you that the suspect was Joe → Passive: You were told that the suspect was Joe
            # The IO is promoted to subject, the that-clause + adjuncts remain
            # Ex: You were told that the suspect was Joe on tuesday
            # Ex mv_np: I know what day you were told that the suspect was Joe on [gap]
            # Ex mv_adjp: I know how confidently you were told that the suspect was Joe [gap] on tuesday
            f"adjunct_list_that_declarative_cl{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_io_bare_declarative_cl{mv_suf}",
        [
            # Active: They told you the suspect was Joe → Passive: You were told the suspect was Joe
            # The IO is promoted to subject, the bare declarative clause + adjuncts remain
            # Ex: You were told the suspect was Joe on tuesday
            # Ex mv_np: I know what day you were told the suspect was Joe on [gap]
            # Ex mv_adjp: I know how confidently you were told the suspect was Joe [gap] on tuesday
            f"adjunct_list_bare_declarative_cl{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_io_exclamative_cl{mv_suf}",
        [
            # Active: They told you how tall she was → Passive: You were told how tall she was
            # The IO is promoted to subject, the exclamative clause + adjuncts remain
            # Ex: You were told how tall she was on tuesday
            # Ex mv_np: I know what day you were told how tall she was on [gap]
            # Ex mv_adjp: I know how loudly you were told how tall she was [gap] on tuesday
            f"adjunct_list_exclamative_cl{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_io_interrogative_cl{mv_suf}",
        [
            # Active: They asked you whether Joe left → Passive: You were asked whether Joe left
            # The IO is promoted to subject, the interrogative clause + adjuncts remain
            # Ex: You were asked whether Joe left on tuesday
            # Ex mv_np: I know what day you were asked whether Joe left on [gap]
            # Ex mv_adjp: I know how loudly you were asked whether Joe left [gap] on tuesday
            f"adjunct_list_interrogative_cl{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_io_quot_cl{mv_suf}",
        [
            # Active: They told you "hello" → Passive: You were told "hello"
            # The IO is promoted to subject, the quote clause + adjuncts remain
            # Ex: You were told "hello" on tuesday
            # Ex mv_np: I know what day you were told "hello" on [gap]
            # Ex mv_adjp: I know how loudly you were told "hello" [gap] on tuesday
            f"adjunct_list_quot_cl{mv_suf}",
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_io_do{mv_suf}",
        [
            # Active: They gave you food → Passive: You were given food
            # The IO is promoted to subject, the DO + adjuncts remain
            # Ex: You were given food on tuesday
            # Ex mv_np: I know what you were given [gap] on tuesday
            # (marginal/rare) Ex mv_adjp: ADJP extraction from post-object adjuncts is very marginal
            f"adjunct_list_o{mv_suf}" if mv_type != "adjp" else None,
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_do_dative_to{mv_suf}",
        [
            # Active: They gave food to you → Passive: Food was given to you
            # The DO is promoted to subject, the dative PP + adjuncts remain
            # Ex: Food was given to you on tuesday
            # Ex mv_np: I know who food was given to [gap] on tuesday
            # (marginal/rare) Ex mv_adjp: ADJP extraction from dative constructions is very marginal
            f"adjunct_list_dative_to{mv_suf}" if mv_type != "adjp" else None,
        ],
    )

    out += serialize_rules(
        f"adjunct_list_passive_pp{mv_suf}",
        [
            # Prepositional passive: They referred to the book → The book was referred to
            # The object of the preposition is promoted to subject, stranded preposition + adjuncts remain
            # Ex: The book was referred to on tuesday
            # Ex mv_np: I know what day the book was referred to on [gap]
            # (marginal/rare) Ex mv_adjp: ADJP extraction from post-preposition adjuncts is very marginal
            f"preposition_np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
        ],
    )

    for particle in particles:

        # Passive of Structure II: verb – particle – O
        # Active: She took off the label → Passive: The label was taken off
        out += serialize_rules(
            f"adjunct_list_passive_prt{particle}_o{mv_suf}",
            [
                # The object is promoted to subject, particle + adjuncts remain
                # Ex: The label was taken off yesterday
                # Ex mv_np: I know what day the label was taken off on [gap]
                f"prt{particle} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
            ],
        )

        # Passive of Structure VII: verb – O – particle – PC
        # Active: This showed him up as spineless → Passive: He was shown up as spineless
        out += serialize_rules(
            f"adjunct_list_passive_o_prt{particle}_predcomp{mv_suf}",
            [
                # The object is promoted to subject, particle + PC + adjuncts remain
                # Ex: He was shown up as spineless yesterday
                # Ex mv_np: I know what day he was shown up as spineless on [gap]
                # Ex mv_adjp: I know how spineless he was shown up as [gap]
                f"prt{particle} predcomp adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"prt{particle} predcomp{mv_suf} adjunct_list",
            ],
        )

        # Passive of verb – O – particle – that-declarative clause
        # Active: She tipped him off that... → Passive: He was tipped off that...
        out += serialize_rules(
            f"adjunct_list_passive_o_prt{particle}_that_declarative_cl{mv_suf}",
            [
                # The object is promoted to subject, particle + that-clause + adjuncts remain
                # Ex: He was tipped off that the police were coming
                f"prt{particle} that_declarative_cl adjunct_list{mv_suf}" if mv_type != "adjp" else None,
            ],
        )

        # Passive of verb – O – particle – bare declarative clause
        # Active: She tipped him off the police were coming → Passive: He was tipped off the police were coming
        out += serialize_rules(
            f"adjunct_list_passive_o_prt{particle}_bare_declarative_cl{mv_suf}",
            [
                # The object is promoted to subject, particle + bare declarative + adjuncts remain
                # Ex: He was tipped off the police were coming
                f"prt{particle} bare_declarative_cl adjunct_list{mv_suf}" if mv_type != "adjp" else None,
            ],
        )



        # Passive of verb – IO – particle – that-declarative clause (alias for o_prt version)
        # Active: She tipped him off that... → Passive: He was tipped off that...
        out += serialize_rules(
            f"adjunct_list_passive_io_prt{particle}_that_declarative_cl{mv_suf}",
            [
                # The indirect object is promoted to subject, particle + that-clause + adjuncts remain
                # Ex: He was tipped off that the police were coming
                f"prt{particle} that_declarative_cl adjunct_list{mv_suf}" if mv_type != "adjp" else None,
            ],
        )

        # Passive of verb – IO – particle – bare declarative clause (alias for o_prt version)
        # Active: She tipped him off the police were coming → Passive: He was tipped off the police were coming
        out += serialize_rules(
            f"adjunct_list_passive_io_prt{particle}_bare_declarative_cl{mv_suf}",
            [
                # The indirect object is promoted to subject, particle + bare declarative + adjuncts remain
                # Ex: He was tipped off the police were coming
                f"prt{particle} bare_declarative_cl adjunct_list{mv_suf}" if mv_type != "adjp" else None,
            ],
        )

        # Passive of Structure III: verb – IO – particle – O (alias for o_prt version)
        # Active: I ran him off another copy → Passive: He was run off another copy
        out += serialize_rules(
            f"adjunct_list_passive_io_prt{particle}_o{mv_suf}",
            [
                # The first object is promoted to subject, particle + second object + adjuncts remain
                # Ex: He was run off another copy
                # Ex mv_np: I know what he was run off [gap]
                f"prt{particle} np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"prt{particle} np{mv_suf} adjunct_list" if mv_type != "adjp" else None,

                # particle-after order: My father was paid that loan back
                # Ex mv_np: I know what my father was paid [gap] back
                f"np prt{particle} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                f"np{mv_suf} prt{particle} adjunct_list" if mv_type != "adjp" else None,
            ],
        )

    # ##################
    # CGEL 6.1.2: Prepositional verb constructions
    # ##################

    for preposition, constituent in pps:
        if constituent == "np":
            # CGEL 6.1.2 Structure I: verb – [prep + O] (e.g., "refer to the book")
            out += serialize_rules(
                f"adjunct_list_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: I referred to the book yesterday
                    # Ex mv_np: I know what I referred to [gap] yesterday
                    f"adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                ],
            )

            # CGEL 6.1.2 Structure II: verb – O – [prep + O] (e.g., "intend it for Kim")
            out += serialize_rules(
                f"adjunct_list_o_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: I intended it for Kim yesterday
                    # Ex mv_np: I know what I intended [gap] for Kim
                    # Ex mv_np: I know who I intended it for [gap]
                    f"np adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"np adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                    f"np{mv_suf} adjunct? pp{preposition}_{constituent} adjunct_list" if mv_type != "adjp" else None,
                ],
            )
        elif constituent == "predcomp":
            # CGEL 6.1.2 Structure IV: verb – [prep + PC] (e.g., "count as too short")
            out += serialize_rules(
                f"adjunct_list_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: It counts as too short
                    # Ex mv_adjp: I know how short it counts as [gap]
                    f"adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )

            # CGEL 6.1.2 Structure V: verb – O – [prep + PC] (e.g., "regard it as successful")
            out += serialize_rules(
                f"adjunct_list_o_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: They regard it as successful
                    # Ex mv_np: I know what they regard [gap] as successful
                    # Ex mv_adjp: I know how successful they regard it as [gap]
                    f"np adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"np adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                    f"np{mv_suf} adjunct? pp{preposition}_{constituent} adjunct_list" if mv_type != "adjp" else None,
                ],
            )
        else:
            # Generic case for other constituents
            out += serialize_rules(
                f"adjunct_list_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )

            out += serialize_rules(
                f"adjunct_list_o_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"np adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"np adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                    f"np{mv_suf} adjunct? pp{preposition}_{constituent} adjunct_list",
                ],
            )

    # ##################
    # CGEL 6.3.2: Particle + preposition constructions
    # ##################

    for particle, pp in particle_pp_pairs:
        if particle is None or pp is None:
            continue
        preposition, constituent = pp

        if constituent == "np":
            # CGEL 6.3.2 Structure IV: verb – particle – [prep + O] (e.g., "look forward to your visit")
            out += serialize_rules(
                f"adjunct_list_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: We look forward to your visit eagerly
                    # Ex mv_np: I know what we look forward to [gap]
                    f"prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"prt{particle} adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                ],
            )

            # CGEL 6.3.2 Structure V: verb – O – particle – [prep + O] (e.g., "let her in on a secret")
            out += serialize_rules(
                f"adjunct_list_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: I let her in on a little secret yesterday
                    # Ex mv_np: I know who I let [gap] in on the secret
                    # Ex mv_np: I know what I let her in on [gap]
                    f"np prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"np prt{particle} adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                    f"np{mv_suf} prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list" if mv_type != "adjp" else None,
                ],
            )
        elif constituent == "predcomp":
            # CGEL 6.3.2 Structure VI: verb – particle – [prep + PC] (e.g., "end up as captain")
            out += serialize_rules(
                f"adjunct_list_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: She ended up as captain
                    # Ex mv_adjp: I know how successful she ended up as [gap]
                    f"prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"prt{particle} adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )

            # CGEL 6.3.2 Structure VII: verb – O – particle – [prep + PC] (e.g., "show him up as spineless")
            out += serialize_rules(
                f"adjunct_list_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: This showed him up as spineless
                    # Ex mv_np: I know who this showed [gap] up as spineless
                    # Ex mv_adjp: I know how spineless this showed him up as [gap]
                    f"np prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"np prt{particle} adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                    f"np{mv_suf} prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list" if mv_type != "adjp" else None,
                ],
            )
        else:
            # Generic case for other constituents
            out += serialize_rules(
                f"adjunct_list_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"prt{particle} adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )

            out += serialize_rules(
                f"adjunct_list_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"np prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"np prt{particle} adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                    f"np{mv_suf} prt{particle} adjunct? pp{preposition}_{constituent} adjunct_list",
                ],
            )

    # ##################
    # Passive forms for prepositional verb constructions
    # ##################

    for preposition, constituent in pps:
        if constituent == "np":
            # Passive of CGEL 6.1.2 Structure I: verb – [prep + O] (e.g., "The book was referred to")
            # PP object promoted to subject, preposition stranded
            out += serialize_rules(
                f"adjunct_list_passive_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: The book was referred to yesterday
                    f"adjunct? pp{preposition}_{constituent}_minus_np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                ],
            )

            # Passive of CGEL 6.1.2 Structure II: verb – O – [prep + O] (e.g., "It was intended for Kim")
            # Direct object promoted to subject, [prep + O] + adjuncts remain
            out += serialize_rules(
                f"adjunct_list_passive_o_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: It was intended for Kim yesterday
                    # Ex mv_np: I know who it was intended for [gap]
                    f"adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                ],
            )
        elif constituent == "predcomp":
            # Passive of CGEL 6.1.2 Structure IV: verb – [prep + PC] with adjp extraction
            # (e.g., "How short does it count as?")
            out += serialize_rules(
                f"adjunct_list_passive_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex mv_adjp: I know how short it counts as [gap]
                    f"adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "np" else None,
                ],
            )

            # Passive of CGEL 6.1.2 Structure V: verb – O – [prep + PC] (e.g., "It was regarded as successful")
            # Direct object promoted to subject, [prep + PC] + adjuncts remain
            out += serialize_rules(
                f"adjunct_list_passive_o_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: It was regarded as successful yesterday
                    # Ex mv_adjp: I know how successful it was regarded as [gap]
                    f"adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )
        else:
            # Generic case for other constituents
            out += serialize_rules(
                f"adjunct_list_passive_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"adjunct? pp{preposition}_{constituent}_minus_np adjunct_list{mv_suf}",
                ],
            )

            out += serialize_rules(
                f"adjunct_list_passive_o_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"adjunct? pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"adjunct? pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )

    # ##################
    # Passive forms for particle + preposition constructions
    # ##################

    for particle, pp in particle_pp_pairs:
        if particle is None or pp is None:
            continue
        preposition, constituent = pp

        if constituent == "np":
            # Passive of CGEL 6.3.2 Structure IV: verb – particle – [prep + O] (e.g., "Your visit was looked forward to")
            # PP object promoted to subject, particle + preposition stranded
            out += serialize_rules(
                f"adjunct_list_passive_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: Your visit was looked forward to eagerly
                    f"prt{particle} pp{preposition}_{constituent}_minus_np adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                ],
            )

            # Passive of CGEL 6.3.2 Structure V: verb – O – particle – [prep + O] (e.g., "She was let in on a secret")
            # Direct object promoted to subject, particle + [prep + O] + adjuncts remain
            out += serialize_rules(
                f"adjunct_list_passive_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: She was let in on a little secret yesterday
                    # Ex mv_np: I know what she was let in on [gap]
                    f"prt{particle} pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"prt{particle} pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "adjp" else None,
                ],
            )
        elif constituent == "predcomp":
            # Passive of CGEL 6.3.2 Structure VI: verb – particle – [prep + PC] with adjp extraction
            # (e.g., "How successful did she end up as?")
            out += serialize_rules(
                f"adjunct_list_passive_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex mv_adjp: I know how successful she ended up as [gap]
                    f"prt{particle} pp{preposition}_{constituent}{mv_suf} adjunct_list" if mv_type != "np" else None,
                ],
            )

            # Passive of CGEL 6.3.2 Structure VII: verb – O – particle – [prep + PC] (e.g., "He was shown up as spineless")
            # Direct object promoted to subject, particle + [prep + PC] + adjuncts remain
            out += serialize_rules(
                f"adjunct_list_passive_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    # Ex: He was shown up as spineless yesterday
                    # Ex mv_adjp: I know how spineless he was shown up as [gap]
                    f"prt{particle} pp{preposition}_{constituent} adjunct_list{mv_suf}" if mv_type != "adjp" else None,
                    f"prt{particle} pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )
        else:
            # Generic case for other constituents
            out += serialize_rules(
                f"adjunct_list_passive_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"prt{particle} pp{preposition}_{constituent}_minus_np adjunct_list{mv_suf}",
                ],
            )

            out += serialize_rules(
                f"adjunct_list_passive_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}",
                [
                    f"prt{particle} pp{preposition}_{constituent} adjunct_list{mv_suf}",
                    f"prt{particle} pp{preposition}_{constituent}{mv_suf} adjunct_list",
                ],
            )

    return out


def vp_grammar(vp_type: str, mv_type: str | None = None):
    mv_suf = "" if mv_type is None else f"_minus_{mv_type}"

    out = ""

    if vp_type in ["vbf_sg", "vbf_pl"]:
        out += f"""
# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
{vp_type}_vp{mv_suf} -> advp_vp? modal bare_inf_cl{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
"""

    out += f"""
# comma-separated list for syndetic coordination: [sang, danced,] (requires 2+ items to avoid ambiguity with binary)
{vp_type}_vp{mv_suf}_coordlist ->  {vp_type}_vp{mv_suf}_coordlist_item {vp_type}_vp{mv_suf}_coordlist_ {{%nt("{vp_type}_vp{mv_suf}_coordlist")%}}
{vp_type}_vp{mv_suf}_coordlist_ -> {vp_type}_vp{mv_suf}_coordlist_item:+ {{%nonterminal_unpack("{vp_type}_vp{mv_suf}_coordlist_")%}}
{vp_type}_vp{mv_suf}_coordlist_item -> {vp_type}_vp{mv_suf} comma {{%nt("{vp_type}_vp{mv_suf}_coordlist_item")%}}

# and-separated list for polysyndetic and: [sang and danced and] (requires 2+ items to avoid ambiguity with binary)
{vp_type}_vp{mv_suf}_and_coordlist ->  {vp_type}_vp{mv_suf}_and_coordlist_item {vp_type}_vp{mv_suf}_and_coordlist_ {{%nt("{vp_type}_vp{mv_suf}_and_coordlist")%}}
{vp_type}_vp{mv_suf}_and_coordlist_ -> {vp_type}_vp{mv_suf}_and_coordlist_item:+ {{%nonterminal_unpack("{vp_type}_vp{mv_suf}_and_coordlist_")%}}
{vp_type}_vp{mv_suf}_and_coordlist_item -> {vp_type}_vp{mv_suf} and {{%nt("{vp_type}_vp{mv_suf}_and_coordlist_item")%}}

# or-separated list for polysyndetic or: [sang or danced or] (requires 2+ items to avoid ambiguity with binary)
{vp_type}_vp{mv_suf}_or_coordlist ->  {vp_type}_vp{mv_suf}_or_coordlist_item {vp_type}_vp{mv_suf}_or_coordlist_ {{%nt("{vp_type}_vp{mv_suf}_or_coordlist")%}}
{vp_type}_vp{mv_suf}_or_coordlist_ -> {vp_type}_vp{mv_suf}_or_coordlist_item:+ {{%nonterminal_unpack("{vp_type}_vp{mv_suf}_or_coordlist_")%}}
{vp_type}_vp{mv_suf}_or_coordlist_item -> {vp_type}_vp{mv_suf} or {{%nt("{vp_type}_vp{mv_suf}_or_coordlist_item")%}}

{vp_type}_vp{mv_suf} ->
# ===== 1. AND =====
# 1a. asyndetic (no coordinator): "sang, danced, laughed"
      {vp_type}_vp{mv_suf}_coordlist {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# 1b. syndetic
#   1b-i. binary: "sang and danced"
    | {vp_type}_vp{mv_suf} and {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
#   1b-ii. list: "sang, danced, and laughed"
    | {vp_type}_vp{mv_suf}_coordlist and {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# 1c. polysyndetic
#   1c-i. list: "sang and danced and laughed"
    | {vp_type}_vp{mv_suf}_and_coordlist {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# ===== 2. BOTH-AND (binary only - "both" implies exactly two) =====
# 2b. syndetic
#   2b-i. binary: "both sang and danced"
    | both {vp_type}_vp{mv_suf} and {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# ===== 3. OR =====
# 3b. syndetic
#   3b-i. binary: "sang or danced"
    | {vp_type}_vp{mv_suf} or {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
#   3b-ii. list: "sang, danced, or laughed"
    | {vp_type}_vp{mv_suf}_coordlist or {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# 3c. polysyndetic
#   3c-i. list: "sang or danced or laughed"
    | {vp_type}_vp{mv_suf}_or_coordlist {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# ===== 4. EITHER-OR =====
# 4b. syndetic
#   4b-i. binary: "either sang or danced"
    | either {vp_type}_vp{mv_suf} or {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
#   4b-ii. list: "either sang, danced, or laughed"
    | either {vp_type}_vp{mv_suf}_coordlist or {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# 4c. polysyndetic
#   4c-i. list: "either sang or danced or laughed"
    | either {vp_type}_vp{mv_suf}_or_coordlist {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# ===== 5. NOR (not available for VP without neither) =====
# ===== 6. NEITHER-NOR =====
# 6b. syndetic
    #   6b-i. binary: "neither sang nor danced"
    | neither {vp_type}_vp{mv_suf} nor {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# ===== 7. BUT =====
# 7b. syndetic
#   7b-i. binary only: "tried but failed"
    | {vp_type}_vp{mv_suf} but {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# ===== 8. NOT ONLY - BUT (binary only, like both-and) =====
# 8b. syndetic
#   8b-i. binary: "not only sang but danced"
    | not_only {vp_type}_vp{mv_suf} but {vp_type}_vp{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
# ===== terminal rules =====
# --- intransitive verbs (no object) ---
    | advp_vp? {vp_type}                        adjunct_list{mv_suf}                          {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb (ex: "I smoked")
    | advp_vp? {vp_type}_predcomp               adjunct_list_predcomp{mv_suf}                 {{%nt("{vp_type}_vp{mv_suf}")%}} # copular verb with predicative complement (ex: "You seemed happy")
    | advp_vp? {vp_type}_to_inf_cl              adjunct_list_to_inf_cl{mv_suf}                {{%nt("{vp_type}_vp{mv_suf}")%}} # catenative verb with to-infinitive (ex: "I wanted to bring the book")
    | advp_vp? {vp_type}_bare_inf_cl            adjunct_list_bare_inf_cl{mv_suf}              {{%nt("{vp_type}_vp{mv_suf}")%}} # catenative verb with bare infinitive (ex: "I helped clean")
    | advp_vp? {vp_type}_that_declarative_cl    adjunct_list_that_declarative_cl{mv_suf}      {{%nt("{vp_type}_vp{mv_suf}")%}} # verb with that-clause (ex: "I knew that you eat")
    | advp_vp? {vp_type}_bare_declarative_cl    adjunct_list_bare_declarative_cl{mv_suf}      {{%nt("{vp_type}_vp{mv_suf}")%}} # verb with bare declarative clause (ex: "I knew you eat")
    | advp_vp? {vp_type}_exclamative_cl         adjunct_list_exclamative_cl{mv_suf}           {{%nt("{vp_type}_vp{mv_suf}")%}} # verb with exclamative clause (ex: "I said how expensive it was")
    | advp_vp? {vp_type}_interrogative_cl       adjunct_list_interrogative_cl{mv_suf}         {{%nt("{vp_type}_vp{mv_suf}")%}} # verb with interrogative clause (ex: "I knew what you eat")
    | advp_vp? {vp_type}_quot_cl                adjunct_list_quot_cl{mv_suf}                  {{%nt("{vp_type}_vp{mv_suf}")%}} # verb with quotation clause (ex: "I said 'hello'")
    | advp_vp? {vp_type}_vbg_cl                 vbg_cl{mv_suf}                                {{%nt("{vp_type}_vp{mv_suf}")%}} # progressive aspect or catenative with gerund (ex: "We are eating", "we started eating")
    | advp_vp? {vp_type}_vbn_cl                 vbn_cl{mv_suf}                                {{%nt("{vp_type}_vp{mv_suf}")%}} # perfect aspect (ex: "He had eaten")
    | advp_vp? {vp_type}_passive_cl             passive_cl{mv_suf}                            {{%nt("{vp_type}_vp{mv_suf}")%}} # passive voice (ex: "He was eaten")
# --- transitive verbs (one object) ---
    | advp_vp? {vp_type}_o                      adjunct_list_o{mv_suf}                        {{%nt("{vp_type}_vp{mv_suf}")%}} # monotransitive verb (ex: "I ate the apple")
    | advp_vp? {vp_type}_o_predcomp             adjunct_list_o_predcomp{mv_suf}               {{%nt("{vp_type}_vp{mv_suf}")%}} # complex-transitive with PC (ex: "I found you happy")
    | advp_vp? {vp_type}_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl{mv_suf}          {{%nt("{vp_type}_vp{mv_suf}")%}} # catenative with raised object + to-infinitive (ex: "I asked you to eat the apple")
    | advp_vp? {vp_type}_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl{mv_suf}        {{%nt("{vp_type}_vp{mv_suf}")%}} # catenative with raised object + bare infinitive (ex: "I made you eat the apple")
    | advp_vp? {vp_type}_io_that_declarative_cl adjunct_list_io_that_declarative_cl{mv_suf}   {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + IO + that-clause (ex: "I told you that you eat the apple")
    | advp_vp? {vp_type}_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl{mv_suf}   {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + IO + bare declarative (ex: "I told you you eat the apple")
    | advp_vp? {vp_type}_io_exclamative_cl      adjunct_list_io_exclamative_cl{mv_suf}        {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + IO + exclamative (ex: "I told you how expensive it was")
    | advp_vp? {vp_type}_io_interrogative_cl    adjunct_list_io_interrogative_cl{mv_suf}      {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + IO + interrogative (ex: "I asked you what you eat")
    | advp_vp? {vp_type}_io_quot_cl             adjunct_list_io_quot_cl{mv_suf}               {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + IO + quotation clause (ex: "I told you 'hello'")
# --- ditransitive verbs (two objects) ---
    | advp_vp? {vp_type}_io_do                  adjunct_list_io_do{mv_suf}                    {{%nt("{vp_type}_vp{mv_suf}")%}} # ditransitive verb (ex: "I gave you food")
    | advp_vp? {vp_type}_io_do                  adjunct_list_do_dative_to{mv_suf}             {{%nt("{vp_type}_vp{mv_suf}")%}} # ditransitive verb with dative shift (ex: "I gave food to you")
"""

    for particle in particles:
        out += f"""
    | advp_vp? {vp_type}_prt{particle}                    adjunct_list_prt{particle}{mv_suf}                      {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.3.2 I: verb + particle (ex: "He gave in")
    | advp_vp? {vp_type}_prt{particle}_predcomp           adjunct_list_prt{particle}_predcomp{mv_suf}             {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.3.2 VI (without as): verb + particle + PC (ex: "She ended up happy", "It turned out fine")
    | advp_vp? {vp_type}_prt{particle}_to_inf_cl          adjunct_list_prt{particle}_to_inf_cl{mv_suf}            {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + particle + to-infinitive (ex: "It turned out to be wrong", "He set out to prove it")
    | advp_vp? {vp_type}_prt{particle}_vbg_cl             adjunct_list_prt{particle}_vbg_cl{mv_suf}               {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + particle + gerund (ex: "She kept on working", "He ended up leaving")
    | advp_vp? {vp_type}_prt{particle}_that_declarative_cl adjunct_list_prt{particle}_that_declarative_cl{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + particle + that-clause (ex: "It turned out that he was lying")
    | advp_vp? {vp_type}_prt{particle}_bare_declarative_cl adjunct_list_prt{particle}_bare_declarative_cl{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + particle + bare declarative (ex: "He made out he was sick")
    | advp_vp? {vp_type}_prt{particle}_interrogative_cl   adjunct_list_prt{particle}_interrogative_cl{mv_suf}     {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + particle + interrogative (ex: "I figured out what he meant", "She worked out how to do it")
    | advp_vp? {vp_type}_prt{particle}_o                  adjunct_list_prt{particle}_o{mv_suf}                    {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.3.2 II: verb + particle + O (ex: "She took off the label")
    | advp_vp? {vp_type}_io_prt{particle}_that_declarative_cl adjunct_list_io_prt{particle}_that_declarative_cl{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + O + particle + that-clause (ex: "She tipped him off that the police were coming")
    | advp_vp? {vp_type}_io_prt{particle}_bare_declarative_cl adjunct_list_io_prt{particle}_bare_declarative_cl{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}} # verb + O + particle + bare declarative (ex: "She tipped him off the police were coming")
    | advp_vp? {vp_type}_io_prt{particle}_o                adjunct_list_io_prt{particle}_o{mv_suf}                  {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.3.2 III: verb + O + particle + O (ex: "I ran him off another copy")
"""

    for (preposition, constituent) in pps:
        out += f"""
    | advp_vp? {vp_type}_prp{preposition}_{constituent}           adjunct_list_prp{preposition}_{constituent}{mv_suf}             {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.1.2 I: verb + [preposition + O] (ex: "I referred to the book") / CGEL 6.1.2 IV: verb + [preposition + PC] (ex: "It counts as too short")
    | advp_vp? {vp_type}_o_prp{preposition}_{constituent}         adjunct_list_o_prp{preposition}_{constituent}{mv_suf}           {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.1.2 V: verb + O + [preposition + PC] (ex: "They regard it as successful") /  CGEL 6.1.2 II: verb + O + [preposition + O] (ex: "I intended it for Kim")

"""
    for particle, pp in particle_pp_pairs:
        if particle is None or pp is None:
            continue
        preposition, constituent = pp

        out += f"""
    | advp_vp? {vp_type}_prt{particle}_prp{preposition}_{constituent}           adjunct_list_prt{particle}_prp{preposition}_{constituent}{mv_suf}          {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.3.2 IV: verb + particle + [preposition + O] (ex: "We look forward to your visit") / CGEL 6.3.2 VI (with as): verb + particle + [preposition + PC] (ex: "She ended up as captain")
    | advp_vp? {vp_type}_o_prt{particle}_prp{preposition}_{constituent}         adjunct_list_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}        {{%nt("{vp_type}_vp{mv_suf}")%}} # CGEL 6.3.2 V: verb + O + particle + [preposition + O] (ex: "I let her in on a little secret") / CGEL 6.3.2 VII: verb + O + particle + [preposition + PC] (ex: "This showed him up as spineless")
"""

    if vp_type == "vbn":
        out += f"""
passive_cl{mv_suf} -> 
# omit all the intransitive verbs
# omit vbg_cl, as one cannot combine passive with progressive aspect *The food was been eaten
# omit vbn_cl, as one cannot combine passive with past perfect *The food was had eaten
# omit passive_cl, as one cannot combine passive with passive *The food was been eaten
# --- prepositional passive (intransitive verb + stranded preposition) ---
      advp_vp? {vp_type}                        adjunct_list_passive_pp{mv_suf}                        {{%nt("passive_cl{mv_suf}")%}} # prepositional passive (ex: "The book was referred to")
# --- passive of transitive verbs ---
    | advp_vp? {vp_type}_o                      adjunct_list_passive_o{mv_suf}                         {{%nt("passive_cl{mv_suf}")%}} # monotransitive passive (ex: "The apple was eaten")
    | advp_vp? {vp_type}_o_predcomp             adjunct_list_passive_o_predcomp{mv_suf}                {{%nt("passive_cl{mv_suf}")%}} # complex-transitive passive (ex: "He was found guilty")
    | advp_vp? {vp_type}_intnp_to_inf_cl        adjunct_list_passive_intnp_to_inf_cl{mv_suf}           {{%nt("passive_cl{mv_suf}")%}} # raised object + to-inf passive (ex: "You were asked to leave")
    | advp_vp? {vp_type}_io_that_declarative_cl adjunct_list_passive_io_that_declarative_cl{mv_suf}    {{%nt("passive_cl{mv_suf}")%}} # IO + that-clause passive (ex: "You were told that...")
    | advp_vp? {vp_type}_io_bare_declarative_cl adjunct_list_passive_io_bare_declarative_cl{mv_suf}    {{%nt("passive_cl{mv_suf}")%}} # IO + bare declarative passive (ex: "You were told...")
    | advp_vp? {vp_type}_io_exclamative_cl      adjunct_list_passive_io_exclamative_cl{mv_suf}         {{%nt("passive_cl{mv_suf}")%}} # IO + exclamative passive (ex: "You were told how...")
    | advp_vp? {vp_type}_io_interrogative_cl    adjunct_list_passive_io_interrogative_cl{mv_suf}       {{%nt("passive_cl{mv_suf}")%}} # IO + interrogative passive (ex: "You were asked whether...")
    | advp_vp? {vp_type}_io_quot_cl             adjunct_list_passive_io_quot_cl{mv_suf}                {{%nt("passive_cl{mv_suf}")%}} # IO + quotation passive (ex: "You were told 'hello'")
# --- passive of ditransitive verbs ---
    | advp_vp? {vp_type}_io_do                  adjunct_list_passive_io_do{mv_suf}                     {{%nt("passive_cl{mv_suf}")%}} # IO promoted passive (ex: "You were given food")
    | advp_vp? {vp_type}_io_do                  adjunct_list_passive_do_dative_to{mv_suf}              {{%nt("passive_cl{mv_suf}")%}} # DO promoted passive (ex: "Food was given to you")
"""
        for particle in particles:
            out += f"""
    | advp_vp? {vp_type}_prt{particle}_o                  adjunct_list_passive_prt{particle}_o{mv_suf}                     {{%nt("passive_cl{mv_suf}")%}} # Structure II passive (ex: "The label was taken off")
    | advp_vp? {vp_type}_o_prt{particle}_predcomp         adjunct_list_passive_o_prt{particle}_predcomp{mv_suf}            {{%nt("passive_cl{mv_suf}")%}} # Structure VII passive (ex: "He was shown up as spineless")
    | advp_vp? {vp_type}_io_prt{particle}_that_declarative_cl adjunct_list_passive_io_prt{particle}_that_declarative_cl{mv_suf} {{%nt("passive_cl{mv_suf}")%}} # O + particle + that-clause passive (ex: "He was tipped off that...")
    | advp_vp? {vp_type}_io_prt{particle}_bare_declarative_cl adjunct_list_passive_io_prt{particle}_bare_declarative_cl{mv_suf} {{%nt("passive_cl{mv_suf}")%}} # O + particle + bare declarative passive (ex: "He was tipped off...")
    | advp_vp? {vp_type}_io_prt{particle}_o                adjunct_list_passive_io_prt{particle}_o{mv_suf}                   {{%nt("passive_cl{mv_suf}")%}} # Structure III passive (ex: "He was run off another copy")
"""

        for preposition, constituent in pps:
            out += f"""
    | advp_vp? {vp_type}_prp{preposition}_{constituent}           adjunct_list_passive_prp{preposition}_{constituent}{mv_suf}       {{%nt("passive_cl{mv_suf}")%}} # prepositional passive (ex: "The book was referred to")
    | advp_vp? {vp_type}_o_prp{preposition}_{constituent}         adjunct_list_passive_o_prp{preposition}_{constituent}{mv_suf}     {{%nt("passive_cl{mv_suf}")%}} # O + [prep + O] passive (ex: "It was intended for Kim") / O + [prep + PC] passive (ex: "It was regarded as successful")
"""

        for particle, pp in particle_pp_pairs:
            if particle is None or pp is None:
                continue
            preposition, constituent = pp
            out += f"""
    | advp_vp? {vp_type}_prt{particle}_prp{preposition}_{constituent}           adjunct_list_passive_prt{particle}_prp{preposition}_{constituent}{mv_suf}       {{%nt("passive_cl{mv_suf}")%}} # particle + prepositional passive (ex: "Your visit was looked forward to")
    | advp_vp? {vp_type}_o_prt{particle}_prp{preposition}_{constituent}         adjunct_list_passive_o_prt{particle}_prp{preposition}_{constituent}{mv_suf}     {{%nt("passive_cl{mv_suf}")%}} # O + particle + [prep + PC] passive (ex: "He was shown up as spineless") / O + particle + [prep + O] passive (ex: "She was let in on a little secret")
"""

    return out


for mv_type in [None, "np", "adjp"]:
    output += adjunct_list_grammar(mv_type)
    for vp_type in ["vbf_sg", "vbf_pl", "inf", "vbg", "vbn"]:
        output += vp_grammar(vp_type, mv_type)

output += """
# infintive clauses
to_inf_cl -> to inf_vp                   {%nt("to_inf_cl")%}
to_inf_cl_minus_np -> to inf_vp_minus_np {%nt("to_inf_cl_minus_np")%}
to_inf_cl_minus_adjp -> to inf_vp_minus_adjp {%nt("to_inf_cl_minus_adjp")%}

bare_inf_cl -> inf_vp                     {%nt("bare_inf_cl")%}
bare_inf_cl_minus_np -> inf_vp_minus_np   {%nt("bare_inf_cl_minus_np")%}
bare_inf_cl_minus_adjp -> inf_vp_minus_adjp   {%nt("bare_inf_cl_minus_adjp")%}

# vbg clause (participle)
vbg_cl -> vbg_vp                           {%nt("vbg_cl")%}
vbg_cl_minus_np -> vbg_vp_minus_np         {%nt("vbg_cl_minus_np")%}
vbg_cl_minus_adjp -> vbg_vp_minus_adjp         {%nt("vbg_cl_minus_adjp")%}

# vbg clause (past participle)
vbn_cl -> vbn_vp                           {%nt("vbn_cl")%}
vbn_cl_minus_np -> vbn_vp_minus_np         {%nt("vbn_cl_minus_np")%}
vbn_cl_minus_adjp -> vbn_vp_minus_adjp         {%nt("vbn_cl_minus_adjp")%}

# a declarative content clause
that_declarative_cl ->  that bare_declarative_cl         {%nt("that_declarative_cl")%}
bare_declarative_cl ->  fin_cl                           {%nt("bare_declarative_cl")%}

# an exclamative content clause
exclamative_cl -> 
      ip_advp_vp     fin_cl                       {%nt("exclamative_cl")%} # how quickly mary became happy
# singular
    | ip_adjp        np_sg vbf_sg_vp_minus_adjp   {%nt("exclamative_cl")%} # how happy he became
# plural
    | ip_adjp        np_pl vbf_pl_vp_minus_adjp   {%nt("exclamative_cl")%} # how happy they became

# an interrogative content clause
interrogative_cl -> 
# yes no qs (singular)
      interrogative_subordinator np_sg vbf_sg_vp              {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether he eats the apple")
# yes no qs (plural)
    | interrogative_subordinator np_pl vbf_pl_vp              {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether they eat the apple")
# interrogative phrase replaces np (singular subject)
    | ip_np_sg                        vbf_sg_vp               {%nt("interrogative_cl")%} # i know who eats that
# interrogative phrase replaces np (plural subject)
    | ip_np_pl                        vbf_pl_vp               {%nt("interrogative_cl")%} # i know which people eat that
# interrogative phrase replaces object np (singular subject)
    | ip_np                        np_sg vbf_sg_vp_minus_np   {%nt("interrogative_cl")%} # i know what he ate
# interrogative phrase replaces object np (plural subject)
    | ip_np                        np_pl vbf_pl_vp_minus_np   {%nt("interrogative_cl")%} # i know what they ate
# interrogative phrase replaces adjunct of time, place, or reason (singular subject)
    | ip_pp                        np_sg vbf_sg_vp            {%nt("interrogative_cl")%} # open interrogative clause (ex: "where he goes")
# interrogative phrase replaces adjunct of time, place, or reason (plural subject)
    | ip_pp                        np_pl vbf_pl_vp            {%nt("interrogative_cl")%} # open interrogative clause (ex: "where they go")
# how to clause
# TODO: not sure this fits everywhere a interrogative clause fits, but it fits in most cases
    | how to_inf_cl {%nt("interrogative_cl")%} # how to do it

# fused relative clause (singular)
fused_relative_clause_sg -> 
      fused_rel_ip_np_sg                        vbf_sg_vp               {%nt("fused_relative_clause_sg")%} # whoever kills him
    | fused_rel_ip_np_sg                        np_sg vbf_sg_vp_minus_np   {%nt("fused_relative_clause_sg")%} # whatever he was mailed
    | fused_rel_ip_np_sg                        np_pl vbf_pl_vp_minus_np   {%nt("fused_relative_clause_sg")%} # whatever they were mailed

# fused relative clause (plural)
fused_relative_clause_pl -> 
      fused_rel_ip_np_pl                        vbf_pl_vp               {%nt("fused_relative_clause_pl")%} # whichever things happen
    | fused_rel_ip_np_pl                        np_sg vbf_sg_vp_minus_np   {%nt("fused_relative_clause_pl")%} # whichever things he was mailed
    | fused_rel_ip_np_pl                        np_pl vbf_pl_vp_minus_np   {%nt("fused_relative_clause_pl")%} # whichever things they were mailed

# a dative to
dative_to -> to np {%nt("dative_to")%}
dative_to_minus_np -> to np_minus_np {%nt("dative_to_minus_np")%}
dative_to_minus_adjp -> to np_minus_adjp {%nt("dative_to_minus_adjp")%}

ip_advp_vp -> how advp_vp {%nt("ip_advp_vp")%}
            | how         {%nt("ip_advp_vp")%}
ip_adjp ->  how adjp      {%nt("ip_advp_vp")%}
            | how         {%nt("ip_advp_vp")%}

# a content clause with some np moved
bare_declarative_cl_minus_np ->
# subject np extracted (singular or plural)
      vbf_sg_vp                    {%nt("bare_declarative_cl_minus_np")%}  # [who] eats apples
    | vbf_pl_vp                    {%nt("bare_declarative_cl_minus_np")%}  # [which people] eat apples
# object np extracted (singular subject)
    | np_sg vbf_sg_vp_minus_np     {%nt("bare_declarative_cl_minus_np")%}  # [what] he eats
# object np extracted (plural subject)
    | np_pl vbf_pl_vp_minus_np     {%nt("bare_declarative_cl_minus_np")%}  # [what] they eat


that_declarative_cl_minus_np -> that bare_declarative_cl_minus_np {%nt("that_declarative_cl_minus_np")%}

# a content clause with some adjp moved
bare_declarative_cl_minus_adjp ->
# singular subject
      np_sg vbf_sg_vp_minus_adjp   {%nt("bare_declarative_cl_minus_adjp")%}  # [how happy] he became
    | np_sg vbf_sg_vp              {%nt("bare_declarative_cl_minus_adjp")%}  # [how quickly] he ran
# plural subject
    | np_pl vbf_pl_vp_minus_adjp   {%nt("bare_declarative_cl_minus_adjp")%}  # [how happy] they became
    | np_pl vbf_pl_vp              {%nt("bare_declarative_cl_minus_adjp")%}  # [how quickly] they ran

# a content clause with some adjp moved
that_declarative_cl_minus_adjp -> that bare_declarative_cl_minus_adjp {%nt("that_declarative_cl_minus_adjp")%}

# interrogative phrase replacing a singular np
# [who] is your friend?
# [what] is your name?
# [which book] is yours?
ip_np_sg -> 
# pronoun equivalent (only singular)
      who                                      {%nt("ip_np_sg")%}
    | what                                     {%nt("ip_np_sg")%}
    | which                                    {%nt("ip_np_sg")%}
# determiner + singular noun
    | ip_det adjp_list noun_sg n_modifier_list_sg {%nt("ip_np_sg")%}


maybe_else -> else {%nt("maybe_else")%}
            | null {%nt("maybe_else")%}

# interrogative phrase replacing a singular np in a fused relative clause
# the differences are:
# * who is not allowed, use whoever instead
# * what and whatever are both allowed
# * which is not allowed, use whichever instead
# all of them support optional "else" modifier (e.g., "whoever else", "whatever else")
# [whoever] killed bob is evil
# [whatever else] happens will be fine
# [whichever book] you choose is yours
fused_rel_ip_np_sg -> 
# pronoun equivalent (only singular)
      whoever maybe_else                                   {%nt("fused_rel_ip_np_sg")%}
    | what maybe_else                                     {%nt("fused_rel_ip_np_sg")%}
    | whatever maybe_else                                  {%nt("fused_rel_ip_np_sg")%}
    | whichever maybe_else                                  {%nt("fused_rel_ip_np_sg")%}
# determiner + singular noun
    | fused_rel_ip_det adjp_list noun_sg n_modifier_list_sg {%nt("fused_rel_ip_np_sg")%}

# interrogative phrase replacing a plural np
# [which books] are yours?
# note that the pronouns who, what, and which are grammatically singular.
ip_np_pl -> 
# determiner + plural noun
      ip_det adjp_list noun_pl n_modifier_list_pl {%nt("ip_np_pl")%}

# interrogative phrase replacing a plural np in a fused relative clause
# the differences are:
# * which is not allowed, use whichever instead
# * whatever is also allowed as a determiner
# [whichever books] you choose are yours
# [whatever things] happen will be fine
fused_rel_ip_np_pl -> 
# determiner + plural noun
      fused_rel_ip_det adjp_list noun_pl n_modifier_list_pl {%nt("fused_rel_ip_np_pl")%}

# generic ip_np for contexts where number doesn't matter (e.g., extracted object)
# I know [what] you eat
ip_np -> ip_np_sg {%nt("ip_np")%}
       | ip_np_pl {%nt("ip_np")%}

ip_det -> which  {%nt("ip_det")%}
        | whose  {%nt("ip_det")%}

fused_rel_ip_det -> whichever  {%nt("fused_rel_ip_det")%}
                  | whatever   {%nt("fused_rel_ip_det")%}

# noun phrase (either singular or plural)
np -> np_sg {%nt("np")%}
    | np_pl {%nt("np")%}


# core noun phrase (either singular or plural)
core_np -> core_np_sg {%nt("core_np")%}
    | core_np_pl {%nt("core_np")%}

# singular noun phrase
np_sg -> precorenp_modifier? core_np_sg postcorenp_modifier? {%nt("np_sg")%}

# plural noun phrase
np_pl -> precorenp_modifier? core_np_pl postcorenp_modifier? {%nt("np_pl")%}

# a noun phrase with another noun phrase moved out
# Ex: I know which country she serves as [prime minister of]
np_minus_np -> precorenp_modifier? core_np_sg_minus_np postcorenp_modifier? {%nt("np_minus_np")%}
             | precorenp_modifier? core_np_pl_minus_np postcorenp_modifier? {%nt("np_minus_np")%}
             | null           {%nt("np_minus_np")%}

# a noun phrase with an adjective moved out
# TODO: currently we don't model the effects of the missing adjective, but we should
np_minus_adjp -> np {%nt("np_minus_adjp")%}

precorenp_modifier? -> precorenp_modifier {%nt("precorenp_modifier?")%}
                     | null               {%nt("precorenp_modifier?")%}

postcorenp_modifier? -> postcorenp_modifier {%nt("postcorenp_modifier?")%}
                      | null                {%nt("postcorenp_modifier?")%}

# comma-separated list for syndetic coordination (requires 2+ items to avoid ambiguity with binary)
core_np_coordlist -> core_np_coordlist_item core_np_coordlist_ {%nt("core_np_coordlist")%}
core_np_coordlist_ -> core_np_coordlist_item:+ {%nonterminal_unpack("core_np_coordlist_")%}
core_np_coordlist_item -> core_np comma {%nt("core_np_coordlist_item")%}

# and-separated list for polysyndetic and (requires 2+ items to avoid ambiguity with binary)
core_np_and_coordlist -> core_np_and_coordlist_item core_np_and_coordlist_ {%nt("core_np_and_coordlist")%}
core_np_and_coordlist_ -> core_np_and_coordlist_item:+ {%nonterminal_unpack("core_np_and_coordlist_")%}
core_np_and_coordlist_item -> core_np and {%nt("core_np_and_coordlist_item")%}

# or-separated list for polysyndetic or ending in singular (requires 2+ items)
core_np_or_sg_coordlist -> core_np_or_coordlist_item core_np_or_sg_coordlist_ {%nt("core_np_or_sg_coordlist")%}
core_np_or_sg_coordlist_ -> core_np_or_sg_coordlist_item:+ {%nonterminal_unpack("core_np_or_sg_coordlist_")%}
core_np_or_sg_coordlist_item -> core_np_sg or {%nt("core_np_or_sg_coordlist_item")%}

# or-separated list for polysyndetic or ending in plural (requires 2+ items)
core_np_or_pl_coordlist -> core_np_or_coordlist_item core_np_or_pl_coordlist_ {%nt("core_np_or_pl_coordlist")%}
core_np_or_pl_coordlist_ -> core_np_or_pl_coordlist_item:+ {%nonterminal_unpack("core_np_or_pl_coordlist_")%}
core_np_or_pl_coordlist_item -> core_np_pl or {%nt("core_np_or_pl_coordlist_item")%}

# generic or-separated item (for the non-final items which don't affect agreement)
core_np_or_coordlist_item -> core_np or {%nt("core_np_or_coordlist_item")%}

# a core singular noun phrase without peripheral modifiers
# Note: only OR-type coordination can produce singular (proximity agreement with rightmost)
# AND-coordination always produces plural, so it's in core_np_pl
core_np_sg -> 
# ===== 3. OR (rightmost conjunct is singular → singular) =====
# 3b. syndetic
#   3b-i. binary: "the cat or the dog" (sg)
      core_np or core_np_sg {%nt("core_np_sg")%}
#   3b-ii. list: "the cat, the bird, or the dog" (sg)
    | core_np_coordlist or core_np_sg {%nt("core_np_sg")%}
# 3c. polysyndetic
#   3c-i. list: "the cat or the bird or the dog" (sg)
    | core_np_or_sg_coordlist core_np_sg {%nt("core_np_sg")%}
# ===== 4. EITHER-OR (rightmost conjunct is singular → singular) =====
# 4b. syndetic
#   4b-i. binary: "either John or Mary" (sg)
    | either core_np or core_np_sg {%nt("core_np_sg")%}
#   4b-ii. list: "either John, Bob, or Mary" (sg)
    | either core_np_coordlist or core_np_sg {%nt("core_np_sg")%}
# 4c. polysyndetic
#   4c-i. list: "either John or Bob or Mary" (sg)
    | either core_np_or_sg_coordlist core_np_sg {%nt("core_np_sg")%}
# ===== 6. NEITHER-NOR (rightmost conjunct is singular → singular) =====
# 6b. syndetic
#   6b-i. binary: "neither John nor Mary" (sg)
    | neither core_np nor core_np_sg {%nt("core_np_sg")%}
# ===== 7. BUT NOT (first conjunct is singular → singular) =====
# 7b. syndetic
#   7b-i. binary: "John but not Mary" (sg, agrees with first)
    | core_np_sg but not core_np {%nt("core_np_sg")%}
# ===== terminal rules =====
    |                                               proper_noun_sg                                  {%nt("core_np_sg")%}  # a singular proper noun (ex: "John", "Mary")
    |                                               pronoun_sg                                      {%nt("core_np_sg")%}  # a singular pronoun (ex: "he", "she", "it")
    |                                               independent_genitive_pronoun                    {%nt("core_np_sg")%}  # a possessive pronoun (ex: "mine", "yours")
    | predeterminer_modifier? determiner? adjp_list noun_sg                      n_modifier_list_sg {%nt("core_np_sg")%}  # determiner phrase followed by a singular nominal (ex: "the lovely apple")
    |                                               fused_relative_clause_sg                        {%nt("core_np_sg")%}  # a singular fused relative clause (ex: "what i was mailed")

# a core plural noun phrase without peripheral modifiers
# note that core_np_pl can consist of many singular noun phrases: "Bob, Alice and Carol are here."
# AND-coordination always produces plural regardless of input number
core_np_pl -> 
# ===== 1. AND (always plural) =====
# 1a. asyndetic (no coordinator): "the cat, the dog, the bird" (implies conjunction)
      core_np_coordlist core_np {%nt("core_np_pl")%}
# 1b. syndetic
#   1b-i. binary: "John and Mary" (pl)
    | core_np and core_np {%nt("core_np_pl")%}
#   1b-ii. list: "John, Mary, and Bob" (pl)
    | core_np_coordlist and core_np {%nt("core_np_pl")%}
# 1c. polysyndetic
#   1c-i. list: "John and Mary and Bob" (pl)
    | core_np_and_coordlist core_np {%nt("core_np_pl")%}
# ===== 2. BOTH-AND (always plural, binary only) =====
# 2b. syndetic
#   2b-i. binary: "both John and Mary" (pl)
    | both core_np and core_np {%nt("core_np_pl")%}
# ===== 3. OR (rightmost conjunct is plural → plural) =====
# 3b. syndetic
#   3b-i. binary: "the cat or the dogs" (pl)
    | core_np or core_np_pl {%nt("core_np_pl")%}
#   3b-ii. list: "the cat, the bird, or the dogs" (pl)
    | core_np_coordlist or core_np_pl {%nt("core_np_pl")%}
# 3c. polysyndetic
#   3c-i. list: "the cat or the bird or the dogs" (pl)
    | core_np_or_pl_coordlist core_np_pl {%nt("core_np_pl")%}
# ===== 4. EITHER-OR (rightmost conjunct is plural → plural) =====
# 4b. syndetic
#   4b-i. binary: "either John or the Smiths" (pl)
    | either core_np or core_np_pl {%nt("core_np_pl")%}
#   4b-ii. list: "either John, Mary, or the Smiths" (pl)
    | either core_np_coordlist or core_np_pl {%nt("core_np_pl")%}
# 4c. polysyndetic
#   4c-i. list: "either John or Mary or the Smiths" (pl)
    | either core_np_or_pl_coordlist core_np_pl {%nt("core_np_pl")%}
# ===== 6. NEITHER-NOR (rightmost conjunct is plural → plural) =====
# 6b. syndetic
#   6b-i. binary: "neither John nor the Smiths" (pl)
    | neither core_np nor core_np_pl {%nt("core_np_pl")%}
# ===== 7. BUT NOT (first conjunct is plural → plural) =====
# 7b. syndetic
#   7b-i. binary: "the cats but not the dog" (pl, agrees with first)
    | core_np_pl but not core_np {%nt("core_np_pl")%}
# ===== 8. NOT ONLY - BUT (always plural, binary only) =====
# 8b. syndetic
#   8b-i. binary: "not only John but Mary" (pl)
    | not_only core_np but core_np {%nt("core_np_pl")%}
# ===== terminal rules =====
    |                                               proper_noun_pl                                  {%nt("core_np_pl")%}  # a plural proper noun (ex: "the Smiths")
    |                                               pronoun_pl                                      {%nt("core_np_pl")%}  # a plural pronoun (ex: "we", "they")
    |                                               independent_genitive_pronoun                    {%nt("core_np_pl")%}  # a possessive pronoun (ex: "mine", "yours")
    | predeterminer_modifier? determiner? adjp_list noun_pl                      n_modifier_list_pl {%nt("core_np_pl")%}  # determiner phrase followed by a plural nominal (ex: "the lovely apples")
    |                                               fused_relative_clause_pl                        {%nt("core_np_pl")%}  # a plural fused relative clause (ex: "whatever things happen")

# I know which country she serves as [prime minister of]
core_np_sg_minus_np -> 
      predeterminer_modifier? determiner? adjp_list noun_sg                      n_modifier_list_minus_np {%nt("core_np_sg_minus_np")%}

core_np_pl_minus_np -> 
      predeterminer_modifier? determiner? adjp_list noun_pl                      n_modifier_list_minus_np {%nt("core_np_pl_minus_np")%}

number -> digits | cardinal_number_eng {%nt("number")%}

quantificational_expression -> quantificational_modifier                        {%nt("quantificational_expression")%}
                             | number                     fraction_denominator  {%nt("quantificational_expression")%}
                             | number                     times                 {%nt("quantificational_expression")%}

precore_emphatic_expression -> precore_emphatic_modifier         {%nt("precore_emphatic_modifier")%} # such a disaster 
                             | precore_emphatic_modifier_adjp  adjp  {%nt("precore_emphatic_modifier")%} # too risky a venture

predeterminer_modifier? -> null                        {%nt("predeterminer_modifier")%}
                        | quantificational_expression  {%nt("predeterminer_modifier")%}
                        | precore_emphatic_expression  {%nt("predeterminer_modifier")%}

# the lawyer [who] defended her
# the dog [which] bit him
# the dog [that] bit him
relative_ip_np_subj -> 
    who     {%nt("relative_ip_np_subj")%}
  | which   {%nt("relative_ip_np_subj")%}
  | that    {%nt("relative_ip_np_subj")%}

# a person [who] she met
# a key [which] she found
# a key [that] she found
# a key [] she found
# a problem [the answer to which] she found online
relative_ip_np_obj ->
    null   {%nt("relative_ip_np_")%}
  | that   {%nt("relative_ip_np_")%}
  | ip_np  {%nt("relative_ip_np_")%}

# restrictive clause (singular) - the head noun is singular, so when the relative pronoun is subject, verb is singular
# ex: "box that is on the table"
restrictive_cl_sg -> 
      relative_ip_np_subj        vbf_sg_vp              {%nt("restrictive_cl_sg")%}  # box [that is on the table]
    | relative_ip_np_obj   np_sg vbf_sg_vp_minus_np    {%nt("restrictive_cl_sg")%}  # box [that he put on the table]
    | relative_ip_np_obj   np_pl vbf_pl_vp_minus_np    {%nt("restrictive_cl_sg")%}  # box [that they put on the table]

# restrictive clause (plural) - the head noun is plural, so when the relative pronoun is subject, verb is plural
# ex: "boxes that are on the table"
restrictive_cl_pl -> 
      relative_ip_np_subj        vbf_pl_vp              {%nt("restrictive_cl_pl")%}  # boxes [that are on the table]
    | relative_ip_np_obj   np_sg vbf_sg_vp_minus_np    {%nt("restrictive_cl_pl")%}  # boxes [that he put on the table]
    | relative_ip_np_obj   np_pl vbf_pl_vp_minus_np    {%nt("restrictive_cl_pl")%}  # boxes [that they put on the table]
  
# a specifier coming after a singular noun
n_modifier_sg -> restrictive_cl_sg     {%nt("n_modifier_sg")%} # a relative clause specifying the noun (ex: box that is on the table)
               | pp                    {%nt("n_modifier_sg")%} # a prepositional phrase specifying the noun (ex: "the book on the table")
               | passive_cl            {%nt("n_modifier_sg")%} # a reduced object relative passive clause (ex: "the horse raced past the barn")

# a specifier coming after a plural noun
n_modifier_pl -> restrictive_cl_pl     {%nt("n_modifier_pl")%} # a relative clause specifying the noun (ex: boxes that are on the table)
               | pp                    {%nt("n_modifier_pl")%} # a prepositional phrase specifying the noun (ex: "the books on the table")
               | passive_cl            {%nt("n_modifier_pl")%} # a reduced object relative passive clause (ex: "the horses raced past the barn")

n_modifier_list_sg -> n_modifier_sg:* {%nonterminal_unpack("n_modifier_list_sg")%}
n_modifier_list_pl -> n_modifier_pl:* {%nonterminal_unpack("n_modifier_list_pl")%}


# I know which country she serves as prime minister [of]
# TODO: there are more cases to consider here.
n_modifier_list_minus_np -> pp_minus_np {%nonterminal_unpack("n_modifier_list_minus_np")%}

# a determiner phrase suitable for countable nouns only
determiner? -> null                 {%nt("determiner")%} # null determiner
             | dp                   {%nt("determiner")%} # the, a, an, some, this, that
             | genitive_np          {%nt("determiner")%} # a noun phrase followed by a possessive suffix (ex: "John's")

genitive_np -> np s                         {%nt("genitive_np")%}
             | dependent_genitive_pronoun   {%nt("genitive_np")%}

dp_modifier? -> null         {%nt("dp_modifier?")%}
              | dp_modifier  {%nt("dp_modifier?")%}

dp -> dp_modifier? core_dp {%nt("dp")%}

core_dp -> determinative {%nt("core_dp")%}
         | number        {%nt("core_dp")%}

# comma-separated list for syndetic coordination (requires 2+ items to avoid ambiguity with binary)
adjunct_coordlist -> adjunct_coordlist_item adjunct_coordlist_ {%nt("adjunct_coordlist")%}
adjunct_coordlist_ -> adjunct_coordlist_item:+ {%nonterminal_unpack("adjunct_coordlist_")%}
adjunct_coordlist_item -> adjunct comma {%nt("adjunct_coordlist_item")%}

# and-separated list for polysyndetic and (requires 2+ items to avoid ambiguity with binary)
adjunct_and_coordlist -> adjunct_and_coordlist_item adjunct_and_coordlist_ {%nt("adjunct_and_coordlist")%}
adjunct_and_coordlist_ -> adjunct_and_coordlist_item:+ {%nonterminal_unpack("adjunct_and_coordlist_")%}
adjunct_and_coordlist_item -> adjunct and {%nt("adjunct_and_coordlist_item")%}

# or-separated list for polysyndetic or (requires 2+ items to avoid ambiguity with binary)
adjunct_or_coordlist -> adjunct_or_coordlist_item adjunct_or_coordlist_ {%nt("adjunct_or_coordlist")%}
adjunct_or_coordlist_ -> adjunct_or_coordlist_item:+ {%nonterminal_unpack("adjunct_or_coordlist_")%}
adjunct_or_coordlist_item -> adjunct or {%nt("adjunct_or_coordlist_item")%}

adjunct -> 
# ===== 1. AND =====
# 1a. asyndetic (no coordinator): "in the house, in the garden, in the park"
      adjunct_coordlist adjunct {%nt("adjunct")%}
# 1b. syndetic
#   1b-i. binary: "in the house and in the garden"
    | adjunct and adjunct {%nt("adjunct")%}
#   1b-ii. list: "in the house, in the garden, and in the park"
    | adjunct_coordlist and adjunct {%nt("adjunct")%}
# 1c. polysyndetic
#   1c-i. list: "in the house and in the garden and in the park"
    | adjunct_and_coordlist adjunct {%nt("adjunct")%}
# ===== 2. BOTH-AND (binary only) =====
# 2b. syndetic
#   2b-i. binary: "both in the house and in the garden"
    | both adjunct and adjunct {%nt("adjunct")%}
# ===== 3. OR =====
# 3b. syndetic
#   3b-i. binary: "in the house or in the garden"
    | adjunct or adjunct {%nt("adjunct")%}
#   3b-ii. list: "in the house, in the garden, or in the park"
    | adjunct_coordlist or adjunct {%nt("adjunct")%}
# 3c. polysyndetic
#   3c-i. list: "in the house or in the garden or in the park"
    | adjunct_or_coordlist adjunct {%nt("adjunct")%}
# ===== 4. EITHER-OR =====
# 4b. syndetic
#   4b-i. binary: "either in the house or in the garden"
    | either adjunct or adjunct {%nt("adjunct")%}
#   4b-ii. list: "either in the house, in the garden, or in the park"
    | either adjunct_coordlist or adjunct {%nt("adjunct")%}
# 4c. polysyndetic
#   4c-i. list: "either in the house or in the garden or in the park"
    | either adjunct_or_coordlist adjunct {%nt("adjunct")%}
# ===== 6. NEITHER-NOR (binary only) =====
# 6b. syndetic
#   6b-i. binary: "neither in the house nor in the garden"
    | neither adjunct nor adjunct {%nt("adjunct")%}
# ===== 7. BUT (binary only) =====
# 7b. syndetic
#   7b-i. binary: "quickly but carefully"
    | adjunct but adjunct {%nt("adjunct")%}
# ===== 8. NOT ONLY - BUT (binary only) =====
# 8b. syndetic
#   8b-i. binary: "not only in the house but in the garden"
    | not_only adjunct but adjunct {%nt("adjunct")%}
# ===== terminal rules =====
    | pp             {%nt("adjunct")%} # a prepositional phrase adjunct (ex: "in the house")
    | advp_vp        {%nt("adjunct")%} # an adverb phrase adjunct compatible with verb use (ex: "quickly")

adjunct? -> adjunct {%nt("adjunct?")%}
         | null   {%nt("adjunct?")%}

adjunct_minus_np ->
      pp_minus_np   {%nt("adjunct")%}

adjunct_minus_adjp ->
      null    {%nt("adjunct_minus_adjp")%}

# interrogative phrase replacing a pp
ip_pp -> where                {%nt("ip_pp")%}   
       | when                 {%nt("ip_pp")%} 
       | why                  {%nt("ip_pp")%}
       | preposition_np ip_np {%nt("ip_pp")%} 

# a prepositional phrase
pp -> preposition                                         {%nt("pp")%}
    | preposition_np                  np                  {%nt("pp")%}
    | preposition_predcomp            predcomp            {%nt("pp")%}
    | preposition_advp                advp                {%nt("pp")%}
    | preposition_bare_declarative_cl bare_declarative_cl {%nt("pp")%}



# here we note down some extraction islands:
vbg_cl_minus_np -> impossible {%nt("vbg_cl_minus_np")%}
vbg_cl_minus_adjp -> impossible {%nt("vbg_cl_minus_adjp")%}
exclamative_cl_minus_np -> impossible {%nt("exclamative_cl_minus_np")%}
exclamative_cl_minus_adjp -> impossible {%nt("exclamative_cl_minus_adjp")%}
interrogative_cl_minus_np -> impossible {%nt("interrogative_cl_minus_np")%}
interrogative_cl_minus_adjp -> impossible {%nt("interrogative_cl_minus_adjp")%}
quot_cl_minus_np -> impossible {%nt("quot_cl_minus_np")%}
quot_cl_minus_adjp -> impossible {%nt("quot_cl_minus_adjp")%}

# a prepositional phrase with np moved
# NOTE: you cannot move out of prepositional clauses: https://en.wikipedia.org/wiki/Wh-movement#Extraction_islands
pp_minus_np ->      preposition_np             {%nt("pp_minus_np")%}

"""
# Specific PP rules for each (preposition, constituent) pair
# These allow grammar rules to reference specific PP types like ppfor_np, ppas_predcomp
for preposition, constituent in pps:
    output += f"""
pp{preposition}_{constituent} -> prp{preposition} {constituent} {{%nt("pp{preposition}_{constituent}")%}}
pp{preposition}_{constituent}_minus_np -> prp{preposition} {{%nt("pp{preposition}_{constituent}_minus_np")%}}
pp{preposition}_{constituent}_minus_adjp -> prp{preposition} {constituent}_minus_adjp {{%nt("pp{preposition}_{constituent}_minus_adjp")%}}
"""


output += """

# a predcomp (predicative complement)
# comma-separated list for syndetic coordination (requires 2+ items to avoid ambiguity with binary)
predcomp_coordlist -> predcomp_coordlist_item predcomp_coordlist_ {%nt("predcomp_coordlist")%}
predcomp_coordlist_ -> predcomp_coordlist_item:+ {%nonterminal_unpack("predcomp_coordlist_")%}
predcomp_coordlist_item -> predcomp comma {%nt("predcomp_coordlist_item")%}

# and-separated list for polysyndetic and (requires 2+ items to avoid ambiguity with binary)
predcomp_and_coordlist -> predcomp_and_coordlist_item predcomp_and_coordlist_ {%nt("predcomp_and_coordlist")%}
predcomp_and_coordlist_ -> predcomp_and_coordlist_item:+ {%nonterminal_unpack("predcomp_and_coordlist_")%}
predcomp_and_coordlist_item -> predcomp and {%nt("predcomp_and_coordlist_item")%}

# or-separated list for polysyndetic or (requires 2+ items to avoid ambiguity with binary)
predcomp_or_coordlist -> predcomp_or_coordlist_item predcomp_or_coordlist_ {%nt("predcomp_or_coordlist")%}
predcomp_or_coordlist_ -> predcomp_or_coordlist_item:+ {%nonterminal_unpack("predcomp_or_coordlist_")%}
predcomp_or_coordlist_item -> predcomp or {%nt("predcomp_or_coordlist_item")%}

predcomp -> 
# ===== 1. AND =====
# 1a. asyndetic (no coordinator): "happy, tired, hungry"
      predcomp_coordlist predcomp {%nt("predcomp")%}
# 1b. syndetic
#   1b-i. binary: "happy and tired"
    | predcomp and predcomp {%nt("predcomp")%}
#   1b-ii. list: "happy, tired, and hungry"
    | predcomp_coordlist and predcomp {%nt("predcomp")%}
# 1c. polysyndetic
#   1c-i. list: "happy and tired and hungry"
    | predcomp_and_coordlist predcomp {%nt("predcomp")%}
# ===== 2. BOTH-AND (binary only) =====
# 2b. syndetic
#   2b-i. binary: "both happy and tired"
    | both predcomp and predcomp {%nt("predcomp")%}
# ===== 3. OR =====
# 3b. syndetic
#   3b-i. binary: "happy or tired"
    | predcomp or predcomp {%nt("predcomp")%}
#   3b-ii. list: "happy, tired, or hungry"
    | predcomp_coordlist or predcomp {%nt("predcomp")%}
# 3c. polysyndetic
#   3c-i. list: "happy or tired or hungry"
    | predcomp_or_coordlist predcomp {%nt("predcomp")%}
# ===== 4. EITHER-OR =====
# 4b. syndetic
#   4b-i. binary: "either happy or tired"
    | either predcomp or predcomp {%nt("predcomp")%}
#   4b-ii. list: "either happy, tired, or hungry"
    | either predcomp_coordlist or predcomp {%nt("predcomp")%}
# 4c. polysyndetic
#   4c-i. list: "either happy or tired or hungry"
    | either predcomp_or_coordlist predcomp {%nt("predcomp")%}
# ===== 6. NEITHER-NOR (binary only) =====
# 6b. syndetic
#   6b-i. binary: "neither happy nor tired"
    | neither predcomp nor predcomp {%nt("predcomp")%}
# ===== 7. BUT (binary only) =====
# 7b. syndetic
#   7b-i. binary: "tired but happy"
    | predcomp but predcomp {%nt("predcomp")%}
# ===== 8. NOT ONLY - BUT (binary only) =====
# 8b. syndetic
#   8b-i. binary: "not only happy but tired"
    | not_only predcomp but predcomp {%nt("predcomp")%}
# ===== terminal rules =====
    | adjp {%nt("predcomp")%} # an adjective phrase (ex: "happy")

predcomp_minus_np -> adjp_minus_np {%nt("predcomp_minus_np")%}

predcomp_minus_adjp -> null {%nt("predcomp_minus_adjp")%}

# an adjective phrase
adjp ->
      advp                  adjp              {%nt("adjp")%} # an adverb phrase followed by an adjective phrase (ex: "very happy") 
    | adj                                   {%nt("adjp")%} # an adjective (ex: "happy")
    | adj_pp                pp              {%nt("adjp")%} # an adjective with a prepositional phrase argument (ex: "fond of music")
    | adj_bare_declarative_cl    bare_declarative_cl  {%nt("adjp")%} # an adjective with a declarative content clause argument (ex: "happy that you are here")
    | adj_that_declarative_cl    that_declarative_cl  {%nt("adjp")%} # an adjective with a declarative content clause argument (ex: "happy you are here")
    | adj_to_inf_cl         to_inf_cl       {%nt("adjp")%} # an adjective with an infinitive clause argument (ex: "happy to be here")

adjp_minus_np ->                                     
      advp                    adjp_minus_np                   {%nt("adjp_minus_np")%}
    | adj_pp                  preposition                     {%nt("adjp_minus_np")%}
    | adj_that_declarative_cl that_declarative_cl_minus_np    {%nt("adjp_minus_np")%}
    | adj_bare_declarative_cl bare_declarative_cl_minus_np    {%nt("adjp_minus_np")%}
    | adj_to_inf_cl           to_inf_cl_minus_np              {%nt("adjp_minus_np")%}

# a sequence of adjps
adjp_list -> adjp:* {%nonterminal_unpack("adjp_list")%}

# an adverb phrase (not necessarily able to modify a vp)
advp -> adv             {%nt("advp")%} # an adverb (ex: "very")
      | adv advp        {%nt("advp")%} # an adverb phrase preceeded by another adverb phrase (ex: "very quickly")

# an adverb phrase able to modify a vp 
advp_vp -> adv_vp             {%nt("advp_vp")%} # an adverb (ex: "quickly")
         | adv advp_vp        {%nt("advp_vp")%} # an adverb phrase preceeded by another adverb phrase (ex: "very quickly")

advp_vp? -> advp_vp {%nt("advp_vp?")%}
          | null    {%nt("advp_vp?")%}

advp? -> advp       {%nt("advp?")%}
       | null       {%nt("advp?")%}

not? -> not         {%nt("not?")%}
      | null        {%nt("not?")%}

maybe_comma -> comma {%nt("maybe_comma")%}
            | null  {%nt("maybe_comma")%}

# idioms / poly-words

# not only / not just / not merely
not_only -> not not_onlyable {%nt("not_only")%}

# terminals

# a rule that always rejects (for impossible cases)
impossible -> "<<impossible>>" {%t("impossible")%}

determinative -> %determinative {%t("determinative")%}
dp_modifier -> %dp_modifier {%t("dp_modifier")%}
pronoun_sg -> %pronoun_sg {%t("pronoun_sg")%}
pronoun_pl -> %pronoun_pl {%t("pronoun_pl")%}
dependent_genitive_pronoun -> %dependent_genitive_pronoun {%t("dependent_genitive_pronoun")%}
independent_genitive_pronoun -> %independent_genitive_pronoun {%t("independent_genitive_pronoun")%}
proper_noun_sg -> %proper_noun_sg {%t("proper_noun_sg")%}
proper_noun_pl -> %proper_noun_pl {%t("proper_noun_pl")%}
noun_sg -> %noun_sg {%t("noun_sg")%}
noun_pl -> %noun_pl {%t("noun_pl")%}
preposition -> %preposition {%t("preposition")%}
preposition_np -> %preposition_np {%t("preposition_np")%}
preposition_predcomp -> %preposition_predcomp {%t("preposition_predcomp")%}
preposition_pp ->  %preposition_pp {%t("preposition_pp")%}
preposition_advp ->  %preposition_advp {%t("preposition_advp")%}
preposition_bare_declarative_cl -> %preposition_bare_declarative_cl {%t("preposition_bare_declarative_cl")%}
to -> %to {%t("to")%}
s -> %s {%t("s")%}
not -> %not {%t("not")%}
that -> %that {%t("that")%}
interrogative_subordinator -> %interrogative_subordinator {%t("interrogative_subordinator")%}
times -> %times {%t("times")%}
cardinal_number_eng -> %cardinal_number_eng {%t("cardinal_number_eng")%}
digits -> %digits {%t("digits")%}
fraction_denominator -> %fraction_denominator {%t("fraction_denominator")%}
modal -> %modal {%t("modal")%}
"""

for particle in particles:
    output += f"""
prt{particle} -> %prt{particle} {{%t("prt{particle}")%}}
"""

for preposition in prepositions:
    output += f"""
prp{preposition} -> %prp{preposition} {{%t("prp{preposition}")%}}
"""

# verb terminals
for vp_type in ["inf", "vbg", "vbn", "vbf_sg", "vbf_pl"]:
    output += f"""
{vp_type} -> %{vp_type} {{%t("{vp_type}")%}}
{vp_type}_predcomp -> %{vp_type}_predcomp {{%t("{vp_type}_predcomp")%}}
{vp_type}_to_inf_cl -> %{vp_type}_to_inf_cl {{%t("{vp_type}_to_inf_cl")%}}
{vp_type}_bare_inf_cl -> %{vp_type}_bare_inf_cl {{%t("{vp_type}_bare_inf_cl")%}}
{vp_type}_that_declarative_cl -> %{vp_type}_that_declarative_cl {{%t("{vp_type}_that_declarative_cl")%}}
{vp_type}_bare_declarative_cl -> %{vp_type}_bare_declarative_cl {{%t("{vp_type}_bare_declarative_cl")%}}
{vp_type}_exclamative_cl -> %{vp_type}_exclamative_cl {{%t("{vp_type}_exclamative_cl")%}}
{vp_type}_interrogative_cl -> %{vp_type}_interrogative_cl {{%t("{vp_type}_interrogative_cl")%}}
{vp_type}_quot_cl -> %{vp_type}_quot_cl {{%t("{vp_type}_quot_cl")%}}
{vp_type}_vbg_cl -> %{vp_type}_vbg_cl {{%t("{vp_type}_vbg_cl")%}}
{vp_type}_vbn_cl -> %{vp_type}_vbn_cl {{%t("{vp_type}_vbn_cl")%}}
{vp_type}_passive_cl -> %{vp_type}_passive_cl {{%t("{vp_type}_passive_cl")%}}
{vp_type}_o -> %{vp_type}_o {{%t("{vp_type}_o")%}}
{vp_type}_o_predcomp -> %{vp_type}_o_predcomp {{%t("{vp_type}_o_predcomp")%}}
{vp_type}_intnp_to_inf_cl -> %{vp_type}_intnp_to_inf_cl {{%t("{vp_type}_intnp_to_inf_cl")%}}
{vp_type}_intnp_bare_inf_cl -> %{vp_type}_intnp_bare_inf_cl {{%t("{vp_type}_intnp_bare_inf_cl")%}}
{vp_type}_io_that_declarative_cl -> %{vp_type}_io_that_declarative_cl {{%t("{vp_type}_io_that_declarative_cl")%}}
{vp_type}_io_bare_declarative_cl -> %{vp_type}_io_bare_declarative_cl {{%t("{vp_type}_io_bare_declarative_cl")%}}
{vp_type}_io_exclamative_cl -> %{vp_type}_io_exclamative_cl {{%t("{vp_type}_io_exclamative_cl")%}}
{vp_type}_io_interrogative_cl -> %{vp_type}_io_interrogative_cl {{%t("{vp_type}_io_interrogative_cl")%}}
{vp_type}_io_quot_cl -> %{vp_type}_io_quot_cl {{%t("{vp_type}_io_quot_cl")%}}
{vp_type}_io_do -> %{vp_type}_io_do {{%t("{vp_type}_io_do")%}}
"""
    for particle in particles:
        output += f"""
{vp_type}_prt{particle} -> %{vp_type}_prt{particle} {{%t("{vp_type}_prt{particle}")%}}
{vp_type}_prt{particle}_predcomp -> %{vp_type}_prt{particle}_predcomp {{%t("{vp_type}_prt{particle}_predcomp")%}}
{vp_type}_prt{particle}_to_inf_cl -> %{vp_type}_prt{particle}_to_inf_cl {{%t("{vp_type}_prt{particle}_to_inf_cl")%}}
{vp_type}_prt{particle}_vbg_cl -> %{vp_type}_prt{particle}_vbg_cl {{%t("{vp_type}_prt{particle}_vbg_cl")%}}
{vp_type}_prt{particle}_that_declarative_cl -> %{vp_type}_prt{particle}_that_declarative_cl {{%t("{vp_type}_prt{particle}_that_declarative_cl")%}}
{vp_type}_prt{particle}_bare_declarative_cl -> %{vp_type}_prt{particle}_bare_declarative_cl {{%t("{vp_type}_prt{particle}_bare_declarative_cl")%}}
{vp_type}_prt{particle}_interrogative_cl -> %{vp_type}_prt{particle}_interrogative_cl {{%t("{vp_type}_prt{particle}_interrogative_cl")%}}
{vp_type}_prt{particle}_o -> %{vp_type}_prt{particle}_o {{%t("{vp_type}_prt{particle}_o")%}}
{vp_type}_o_prt{particle}_predcomp -> %{vp_type}_o_prt{particle}_predcomp {{%t("{vp_type}_o_prt{particle}_predcomp")%}}
{vp_type}_io_prt{particle}_that_declarative_cl -> %{vp_type}_io_prt{particle}_that_declarative_cl {{%t("{vp_type}_io_prt{particle}_that_declarative_cl")%}}
{vp_type}_io_prt{particle}_bare_declarative_cl -> %{vp_type}_io_prt{particle}_bare_declarative_cl {{%t("{vp_type}_io_prt{particle}_bare_declarative_cl")%}}
{vp_type}_io_prt{particle}_o -> %{vp_type}_io_prt{particle}_o {{%t("{vp_type}_io_prt{particle}_o")%}}
"""

    for preposition, constituent in pps:
        output += f"""
{vp_type}_prp{preposition}_{constituent} -> %{vp_type}_prp{preposition}_{constituent} {{%t("{vp_type}_prp{preposition}_{constituent}")%}}
{vp_type}_o_prp{preposition}_{constituent} -> %{vp_type}_o_prp{preposition}_{constituent} {{%t("{vp_type}_o_prp{preposition}_{constituent}")%}}
"""

    for particle, pp in particle_pp_pairs:
        if particle is None or pp is None:
            continue
        preposition, constituent = pp
        output += f"""
{vp_type}_prt{particle}_prp{preposition}_{constituent} -> %{vp_type}_prt{particle}_prp{preposition}_{constituent} {{%t("{vp_type}_prt{particle}_prp{preposition}_{constituent}")%}}
{vp_type}_o_prt{particle}_prp{preposition}_{constituent} -> %{vp_type}_o_prt{particle}_prp{preposition}_{constituent} {{%t("{vp_type}_o_prt{particle}_prp{preposition}_{constituent}")%}}
"""

# auxiliary verb terminals (only for finite verbs)
for vp_type in ["vbf_sg", "vbf_pl"]:
    output += f"""
aux_{vp_type}_predcomp -> %aux_{vp_type}_predcomp {{%t("aux_{vp_type}_predcomp")%}}
aux_{vp_type}_o -> %aux_{vp_type}_o {{%t("aux_{vp_type}_o")%}}
aux_{vp_type}_vbg_cl -> %aux_{vp_type}_vbg_cl {{%t("aux_{vp_type}_vbg_cl")%}}
aux_{vp_type}_vbn_cl -> %aux_{vp_type}_vbn_cl {{%t("aux_{vp_type}_vbn_cl")%}}
aux_{vp_type}_passive_cl -> %aux_{vp_type}_passive_cl {{%t("aux_{vp_type}_passive_cl")%}}
aux_{vp_type}_bare_inf_cl -> %aux_{vp_type}_bare_inf_cl {{%t("aux_{vp_type}_bare_inf_cl")%}}
"""

output += """
adj -> %adj {%t("adj")%}
adj_pp -> %adj_pp {%t("adj_pp")%}
adj_that_declarative_cl -> %adj_that_declarative_cl {%t("adj_that_declarative_cl")%}
adj_bare_declarative_cl -> %adj_bare_declarative_cl {%t("adj_bare_declarative_cl")%}
adj_to_inf_cl -> %adj_to_inf_cl {%t("adj_to_inf_cl")%}
adv -> %adv {%t("adv")%}
adv_vp -> %adv_vp {%t("adv_vp")%}
who -> %who {%t("who")%}
whose -> %whose {%t("whose")%}
what -> %what {%t("what")%}
which -> %which {%t("which")%}
where -> %where {%t("where")%}
when -> %when {%t("when")%}
why -> %why {%t("why")%}
how -> %how {%t("how")%}
whatever -> %whatever {%t("whatever")%}
whichever -> %whichever {%t("whichever")%}
whoever -> %whoever {%t("whoever")%}
else -> %else_word {%t("else")%}
precorenp_modifier -> %precorenp_modifier {%t("precorenp_modifier")%}
postcorenp_modifier -> %postcorenp_modifier {%t("postcorenp_modifier")%}
precore_emphatic_modifier -> %precore_emphatic_modifier {%t("precore_emphatic_modifier")%}
precore_emphatic_modifier_adjp  -> %precore_emphatic_modifier_adjp  {%t("precore_emphatic_modifier_adjp ")%}
quantificational_modifier -> %quantificational_modifier {%t("quantificational_modifier")%}
either -> %either {%t("either")%}
neither -> %neither {%t("neither")%}
both -> %both {%t("both")%}
and -> %and {%t("and")%}
or -> %or {%t("or")%}
but -> %but {%t("but")%}
nor -> %nor {%t("nor")%}
not_onlyable -> %not_onlyable {%t("not_onlyable")%}
period -> %period {%t("period")%}
question_mark -> %question_mark {%t("question_mark")%}
exclamation_mark -> %exclamation_mark {%t("exclamation_mark")%}
comma -> %comma {%t("comma")%}
quotation_mark -> %quotation_mark {%t("quotation_mark")%}
"""

print(output)