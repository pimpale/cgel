# Lexicon

This directory contains the source data and build script for the English lexicon.

## Building

```bash
cd lexicon
python make_lexicon.py -o english.json
```

## Output Structure

The generated `english.json` is a word-to-categories mapping:

```json
{
  "run": ["inf", "inf_o", "vbf_pl", "vbf_pl_o", ...],
  "cat": ["animals", "countable_noun", "noun_sg"],
  "the": ["determinative"]
}
```

Each word maps to a list of grammatical categories it belongs to.

## Source Files

| Directory/File | Description |
|----------------|-------------|
| `indeclinable.json` | Closed-class words (determiners, pronouns, conjunctions, punctuation) |
| `nouns/` | Noun classes organized by semantics (animals, food, locations, etc.) with countability metadata |
| `verb_verbnet/` | VerbNet-derived verb frames with syntactic subcategorization |
| `verb_custom/` | Custom verb entries (auxiliaries, special cases) |
| `adverbs/` | Adverb classes (temporal, spatial, etc.) |
| `prepositions/` | Preposition classes by semantic role (goal, source, temporal, etc.) |
| `irregular_noun_forms.json` | Irregular noun plurals (child→children) |
| `irregular_verb_forms.json` | Irregular verb inflections (go→went→gone) |

## Automatic Inflection

The build script generates inflected forms automatically:

- **Nouns**: singular → plural (cat→cats, baby→babies)
- **Verbs**: base form → VBD, VBN, VBG, VBZ, VBP (run→ran, run, running, runs, run)

Irregular forms are looked up from the JSON files; regular forms use morphological rules.

## Verb Subcategorization

Verbs are categorized by their syntactic frames derived from VerbNet:

- `vb` — intransitive (she *sleeps*)
- `vb_o` — transitive (she *sees* him)
- `vb_io_do` — ditransitive (she *gave* him a book)
- `vb_to_inf_cl` — to-infinitive complement (she *wants* to go)
- `vb_that_declarative_cl` — that-clause complement (she *thinks* that...)
- `vb_prt_o` — phrasal transitive (she *picked* it *up*)

## Noun Class Hierarchy

Noun files can include other classes via `"classes": [...]`, resolved transitively. Each class specifies `"countable": true/false` which determines plural form generation.
