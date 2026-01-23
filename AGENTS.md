# Tips for agents

Please use `npm run build:lexicon` to build the lexicon. Do this if you have changed any nouns, verbs, adjectives, etc in the lexicon folder.
Please use `npm run build:grammar` to build the grammar. This takes a while (30s), so avoid doing it unless necessary. Do do this though, if you change gen_englishGrammar.py
If you add a new verbal idiom (including prepositional verbs and phrasal verbs) (eg "take it off"), then you need to 1. build lexicon and 2. build grammar. Grammar looks at lexicon to autogenerate some rules. You don't need to do this if you are only adding a normal verb, noun, or adjective. 

You can run tests with `npm run test`.
If you want to rebuild the json visualized by the playground, run `npm run test:json`.
These go to `playground/test-results.json`.