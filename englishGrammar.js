// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

import english from './english.json';

function isPoS(pos) {
  return {test: word => (english[word] ?? ["proper_noun"]).includes(pos)}
}

function isAllOfPoS(pos_arr) {
  return {test: word => pos_arr.every(pos => (english[word]??["proper_noun"]).includes(pos))}
}

// parts of speech
const determinative = isPoS("determinative");
const dp_modifier = isPoS("dp_modifier");
const pronoun = isPoS("pronoun");
const independent_genitive_pronoun = isPoS("independent_genitive_pronoun");
const dependent_genitive_pronoun = isPoS("dependent_genitive_pronoun");
const proper_noun = isPoS("proper_noun");
const noun = isPoS("noun");
const preposition = isPoS("preposition");
const preposition_np = isPoS("preposition_np");
const preposition_predcomp = isPoS("preposition_predcomp");
const preposition_bare_declarative_cl = isPoS("preposition_bare_declarative_cl");
const preposition_pp = isPoS("preposition_pp");
const preposition_advp = isPoS("preposition_advp");


// particles
const to = isPoS("to");
const s = isPoS("s");
const not = isPoS("not");
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

// punctuation
const period = {test: x => x == "." };
const question_mark = { test: x => x == "?" };
const exclamation_mark = { test: x => x == "!" };

// verbs

// Modal (MODAL)
const modal = isPoS("modal");

// Base Verb (VB)
const vb = isPoS("vb");
const vb_predcomp = isPoS("vb_predcomp");
const vb_to_inf_cl = isPoS("vb_to_inf_cl");
const vb_bare_inf_cl = isPoS("vb_bare_inf_cl");
const vb_that_declarative_cl = isPoS("vb_that_declarative_cl");
const vb_bare_declarative_cl = isPoS("vb_bare_declarative_cl");
const vb_exclamative_cl = isPoS("vb_exclamative_cl");
const vb_interrogative_cl = isPoS("vb_interrogative_cl");
const vb_vbg_cl = isPoS("vb_vbg_cl");
const vb_vbn_cl = isPoS("vb_vbn_cl");
const vb_passive_cl = isPoS("vb_passive_cl");
const vb_np = isPoS("vb_np");
const vb_np_predcomp = isPoS("vb_np_predcomp");
const vb_np_to_inf_cl = isPoS("vb_np_to_inf_cl");
const vb_np_bare_inf_cl = isPoS("vb_np_bare_inf_cl");
const vb_np_that_declarative_cl = isPoS("vb_np_that_declarative_cl");
const vb_np_bare_declarative_cl = isPoS("vb_np_bare_declarative_cl");
const vb_np_exclamative_cl = isPoS("vb_np_exclamative_cl");
const vb_np_interrogative_cl = isPoS("vb_np_interrogative_cl");
const vb_np_np = isPoS("vb_np_np");

// Verb Gerund or Present Participle (VBG)
const vbg = isPoS("vbg");
const vbg_predcomp = isPoS("vbg_predcomp");
const vbg_to_inf_cl = isPoS("vbg_to_inf_cl");
const vbg_bare_inf_cl = isPoS("vbg_bare_inf_cl");
const vbg_that_declarative_cl = isPoS("vbg_that_declarative_cl");
const vbg_bare_declarative_cl = isPoS("vbg_bare_declarative_cl");
const vbg_exclamative_cl = isPoS("vbg_exclamative_cl");
const vbg_interrogative_cl = isPoS("vbg_interrogative_cl");
const vbg_vbg_cl = isPoS("vbg_vbg_cl");
const vbg_vbn_cl = isPoS("vbg_vbn_cl");
const vbg_passive_cl = isPoS("vbg_passive_cl");
const vbg_np = isPoS("vbg_np");
const vbg_np_predcomp = isPoS("vbg_np_predcomp");
const vbg_np_to_inf_cl = isPoS("vbg_np_to_inf_cl");
const vbg_np_bare_inf_cl = isPoS("vbg_np_bare_inf_cl");
const vbg_np_that_declarative_cl = isPoS("vbg_np_that_declarative_cl");
const vbg_np_bare_declarative_cl = isPoS("vbg_np_bare_declarative_cl");
const vbg_np_exclamative_cl = isPoS("vbg_np_exclamative_cl");
const vbg_np_interrogative_cl = isPoS("vbg_np_interrogative_cl");
const vbg_np_np = isPoS("vbg_np_np");

// Verb Past Participle (VBN)
const vbn = isPoS("vbn");
const vbn_predcomp = isPoS("vbn_predcomp");
const vbn_to_inf_cl = isPoS("vbn_to_inf_cl");
const vbn_bare_inf_cl = isPoS("vbn_bare_inf_cl");
const vbn_that_declarative_cl = isPoS("vbn_that_declarative_cl");
const vbn_bare_declarative_cl = isPoS("vbn_bare_declarative_cl");
const vbn_exclamative_cl = isPoS("vbn_exclamative_cl");
const vbn_interrogative_cl = isPoS("vbn_interrogative_cl");
const vbn_vbg_cl = isPoS("vbn_vbg_cl");
const vbn_vbn_cl = isPoS("vbn_vbn_cl");
const vbn_passive_cl = isPoS("vbn_passive_cl");
const vbn_np = isPoS("vbn_np");
const vbn_np_predcomp = isPoS("vbn_np_predcomp");
const vbn_np_to_inf_cl = isPoS("vbn_np_to_inf_cl");
const vbn_np_bare_inf_cl = isPoS("vbn_np_bare_inf_cl");
const vbn_np_that_declarative_cl = isPoS("vbn_np_that_declarative_cl");
const vbn_np_bare_declarative_cl = isPoS("vbn_np_bare_declarative_cl");
const vbn_np_exclamative_cl = isPoS("vbn_np_exclamative_cl");
const vbn_np_interrogative_cl = isPoS("vbn_np_interrogative_cl");
const vbn_np_np = isPoS("vbn_np_np");

// Verb Finite (VBF): supercategory for the following
const vbf = isPoS("vbf");
const vbf_predcomp = isPoS("vbf_predcomp");
const vbf_to_inf_cl = isPoS("vbf_to_inf_cl");
const vbf_bare_inf_cl = isPoS("vbf_bare_inf_cl");
const vbf_that_declarative_cl = isPoS("vbf_that_declarative_cl");
const vbf_bare_declarative_cl = isPoS("vbf_bare_declarative_cl");
const vbf_exclamative_cl = isPoS("vbf_exclamative_cl");
const vbf_interrogative_cl = isPoS("vbf_interrogative_cl");
const vbf_vbg_cl = isPoS("vbf_vbg_cl");
const vbf_vbn_cl = isPoS("vbf_vbn_cl");
const vbf_passive_cl = isPoS("vbf_passive_cl");
const vbf_np = isPoS("vbf_np");
const vbf_np_predcomp = isPoS("vbf_np_predcomp");
const vbf_np_to_inf_cl = isPoS("vbf_np_to_inf_cl");
const vbf_np_bare_inf_cl = isPoS("vbf_np_bare_inf_cl");
const vbf_np_that_declarative_cl = isPoS("vbf_np_that_declarative_cl");
const vbf_np_bare_declarative_cl = isPoS("vbf_np_bare_declarative_cl");
const vbf_np_exclamative_cl = isPoS("vbf_np_exclamative_cl");
const vbf_np_interrogative_cl = isPoS("vbf_np_interrogative_cl");
const vbf_np_np = isPoS("vbf_np_np");

// certain core auxiliaries
const aux_vbf_predcomp = isAllOfPoS(["vbf_predcomp", "aux"]);
const aux_vbf_np = isAllOfPoS(["vbf_np", "aux"]);
const aux_vbf_vbg_cl = isAllOfPoS(["vbf_vbg_cl", "aux"]);
const aux_vbf_vbn_cl = isAllOfPoS(["vbf_vbn_cl", "aux"]);
const aux_vbf_passive_cl = isAllOfPoS(["vbf_passive_cl", "aux"]);
const aux_vbf_bare_inf_cl = isAllOfPoS(["vbf_bare_inf_cl", "aux"]);

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

let Lexer = undefined;
let ParserRules = [
    {"name": "text$ebnf$1", "symbols": []},
    {"name": "text$ebnf$1", "symbols": ["text$ebnf$1", "sentence"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "text", "symbols": ["text$ebnf$1"], "postprocess": nonterminal_unpack("text")},
    {"name": "sentence", "symbols": ["fin_cl", "period"], "postprocess": nt("sentence")},
    {"name": "sentence", "symbols": ["fin_cl", "exclamation_mark"], "postprocess": nt("sentence")},
    {"name": "sentence", "symbols": ["question_cl", "question_mark"], "postprocess": nt("sentence")},
    {"name": "fin_cl", "symbols": ["adjunct_list", "np", "fin_vp"], "postprocess": nt("fin_cl")},
    {"name": "question_cl", "symbols": ["subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_np", "fin_vp"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_np", "subj_aux_inv_cl_np_moved"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_pp", "subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_advp_vp", "subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_adjp", "subj_aux_inv_cl_adjp_moved"], "postprocess": nt("question_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["modal", "np", "adjunct_list_bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_predcomp", "np", "adjunct_list_predcomp"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_np", "np", "adjunct_list_np"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_vbg_cl", "np", "vbg_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_vbn_cl", "np", "vbn_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_passive_cl", "np", "passive_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_bare_inf_cl", "np", "adjunct_list_bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["modal", "adjunct_list_bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["modal", "np", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_predcomp", "adjunct_list_predcomp"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_np", "adjunct_list_np"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_vbg_cl", "vbg_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_vbn_cl", "vbn_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_passive_cl", "passive_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_predcomp", "np", "adjunct_list_predcomp_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_np", "np", "adjunct_list_np_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_vbg_cl", "np", "vbg_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_vbn_cl", "np", "vbn_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_passive_cl", "np", "passive_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["aux_vbf_bare_inf_cl", "np", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_adjp_moved", "symbols": ["modal", "np", "adjunct_list_bare_inf_cl_adjp_moved"], "postprocess": nt("subj_aux_inv_cl_adjp_moved")},
    {"name": "subj_aux_inv_cl_adjp_moved", "symbols": ["aux_vbf_predcomp", "np", "adjunct_list_predcomp_adjp_moved"], "postprocess": nt("subj_aux_inv_cl_adjp_moved")},
    {"name": "subj_aux_inv_cl_adjp_moved", "symbols": ["aux_vbf_np", "np", "adjunct_list_np_adjp_moved"], "postprocess": nt("subj_aux_inv_cl_adjp_moved")},
    {"name": "subj_aux_inv_cl_adjp_moved", "symbols": ["aux_vbf_vbg_cl", "np", "vbg_cl_adjp_moved"], "postprocess": nt("subj_aux_inv_cl_adjp_moved")},
    {"name": "subj_aux_inv_cl_adjp_moved", "symbols": ["aux_vbf_vbn_cl", "np", "vbn_cl_adjp_moved"], "postprocess": nt("subj_aux_inv_cl_adjp_moved")},
    {"name": "subj_aux_inv_cl_adjp_moved", "symbols": ["aux_vbf_passive_cl", "np", "passive_cl_adjp_moved"], "postprocess": nt("subj_aux_inv_cl_adjp_moved")},
    {"name": "subj_aux_inv_cl_adjp_moved", "symbols": ["aux_vbf_bare_inf_cl", "np", "adjunct_list_bare_inf_cl_adjp_moved"], "postprocess": nt("subj_aux_inv_cl_adjp_moved")},
    {"name": "adjunct_list$ebnf$1", "symbols": []},
    {"name": "adjunct_list$ebnf$1", "symbols": ["adjunct_list$ebnf$1", "adjunct"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "adjunct_list", "symbols": ["adjunct_list$ebnf$1"], "postprocess": nonterminal_unpack("adjunct_list")},
    {"name": "adjunct_list_predcomp", "symbols": ["adjunct", "adjunct_list_predcomp"], "postprocess": nt("adjunct_list_predcomp")},
    {"name": "adjunct_list_predcomp", "symbols": ["predcomp", "adjunct_list"], "postprocess": nt("adjunct_list_predcomp")},
    {"name": "adjunct_list_to_inf_cl", "symbols": ["adjunct", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_to_inf_cl")},
    {"name": "adjunct_list_to_inf_cl", "symbols": ["to_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl")},
    {"name": "adjunct_list_bare_inf_cl", "symbols": ["bare_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_bare_inf_cl")},
    {"name": "adjunct_list_that_declarative_cl", "symbols": ["adjunct", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl")},
    {"name": "adjunct_list_that_declarative_cl", "symbols": ["that_declarative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl")},
    {"name": "adjunct_list_bare_declarative_cl", "symbols": ["adjunct", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl")},
    {"name": "adjunct_list_bare_declarative_cl", "symbols": ["bare_declarative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl")},
    {"name": "adjunct_list_exclamative_cl", "symbols": ["adjunct", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_exclamative_cl")},
    {"name": "adjunct_list_exclamative_cl", "symbols": ["exclamative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_exclamative_cl")},
    {"name": "adjunct_list_interrogative_cl", "symbols": ["adjunct", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_interrogative_cl")},
    {"name": "adjunct_list_interrogative_cl", "symbols": ["interrogative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_interrogative_cl")},
    {"name": "adjunct_list_np", "symbols": ["np", "adjunct_list"], "postprocess": nt("adjunct_list_np")},
    {"name": "adjunct_list_np_predcomp", "symbols": ["np", "adjunct_list_predcomp"], "postprocess": nt("adjunct_list_np_predcomp")},
    {"name": "adjunct_list_np_predcomp", "symbols": ["predcomp", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_predcomp")},
    {"name": "adjunct_list_np_to_inf_cl", "symbols": ["adjunct", "adjunct_list_np_to_inf_cl"], "postprocess": nt("adjunct_list_np_predcomp")},
    {"name": "adjunct_list_np_to_inf_cl", "symbols": ["np", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_np_predcomp")},
    {"name": "adjunct_list_np_bare_inf_cl", "symbols": ["adjunct", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("adjunct_list_np_predcomp")},
    {"name": "adjunct_list_np_bare_inf_cl", "symbols": ["np", "adjunct_list_bare_inf_cl"], "postprocess": nt("adjunct_list_np_predcomp")},
    {"name": "adjunct_list_np_that_declarative_cl", "symbols": ["adjunct", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl")},
    {"name": "adjunct_list_np_that_declarative_cl", "symbols": ["np", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl")},
    {"name": "adjunct_list_np_bare_declarative_cl", "symbols": ["adjunct", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl")},
    {"name": "adjunct_list_np_bare_declarative_cl", "symbols": ["np", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl")},
    {"name": "adjunct_list_np_exclamative_cl", "symbols": ["adjunct", "adjunct_list_np_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl")},
    {"name": "adjunct_list_np_exclamative_cl", "symbols": ["np", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl")},
    {"name": "adjunct_list_np_interrogative_cl", "symbols": ["adjunct", "adjunct_list_np_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl")},
    {"name": "adjunct_list_np_interrogative_cl", "symbols": ["np", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl")},
    {"name": "adjunct_list_np_np", "symbols": ["adjunct", "adjunct_list_np_np"], "postprocess": nt("adjunct_list_np_np")},
    {"name": "adjunct_list_np_np", "symbols": ["np", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_np")},
    {"name": "adjunct_list_np_np", "symbols": ["to", "np", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_np")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "modal", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf", "adjunct_list"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_predcomp", "adjunct_list_predcomp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_vbg_cl", "vbg_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_vbn_cl", "vbn_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_passive_cl", "passive_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np", "adjunct_list_np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_predcomp", "adjunct_list_np_predcomp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_to_inf_cl", "adjunct_list_np_to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_exclamative_cl", "adjunct_list_np_exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_interrogative_cl", "adjunct_list_np_interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp_vp?", "vbf_np_np", "adjunct_list_np_np"], "postprocess": nt("fin_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb", "adjunct_list"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_predcomp", "adjunct_list_predcomp"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_vbg_cl", "vbg_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_vbn_cl", "vbn_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_passive_cl", "passive_cl"], "postprocess": nt("fin_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np", "adjunct_list_np"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_predcomp", "adjunct_list_np_predcomp"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_to_inf_cl", "adjunct_list_np_to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_exclamative_cl", "adjunct_list_np_exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_interrogative_cl", "adjunct_list_np_interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "vb_np_np", "adjunct_list_np_np"], "postprocess": nt("inf_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg", "adjunct_list"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_predcomp", "adjunct_list_predcomp"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_vbg_cl", "vbg_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_vbn_cl", "vbn_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_passive_cl", "passive_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np", "adjunct_list_np"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_predcomp", "adjunct_list_np_predcomp"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_to_inf_cl", "adjunct_list_np_to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_exclamative_cl", "adjunct_list_np_exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_interrogative_cl", "adjunct_list_np_interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_np_np", "adjunct_list_np_np"], "postprocess": nt("vbg_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn", "adjunct_list"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_predcomp", "adjunct_list_predcomp"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_vbg_cl", "vbg_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_vbn_cl", "vbn_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_passive_cl", "passive_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np", "adjunct_list_np"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_predcomp", "adjunct_list_np_predcomp"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_to_inf_cl", "adjunct_list_np_to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_exclamative_cl", "adjunct_list_np_exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_interrogative_cl", "adjunct_list_np_interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_np_np", "adjunct_list_np_np"], "postprocess": nt("vbn_vp")},
    {"name": "adjunct_list_np_moved", "symbols": ["adjunct", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_np_moved")},
    {"name": "adjunct_list_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_np_moved")},
    {"name": "adjunct_list_predcomp_np_moved", "symbols": ["predcomp", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_predcomp_np_moved")},
    {"name": "adjunct_list_predcomp_np_moved", "symbols": ["predcomp_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_predcomp_np_moved")},
    {"name": "adjunct_list_to_inf_cl_np_moved", "symbols": ["adjunct", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("adjunct_list_to_inf_cl_np_moved")},
    {"name": "adjunct_list_to_inf_cl_np_moved", "symbols": ["to_inf_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_to_inf_cl_np_moved")},
    {"name": "adjunct_list_to_inf_cl_np_moved", "symbols": ["to_inf_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl_np_moved")},
    {"name": "adjunct_list_bare_inf_cl_np_moved", "symbols": ["bare_inf_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_bare_inf_cl_np_moved", "symbols": ["bare_inf_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_np_moved", "symbols": ["np", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_np_np_moved")},
    {"name": "adjunct_list_np_np_moved", "symbols": ["adjunct_list"], "postprocess": nt("adjunct_list_np_np_moved")},
    {"name": "adjunct_list_np_predcomp_np_moved", "symbols": ["predcomp", "adjunct_list"], "postprocess": nt("adjunct_list_np_predcomp_np_moved")},
    {"name": "adjunct_list_np_predcomp_np_moved", "symbols": ["np", "adjunct_list_predcomp_np_moved"], "postprocess": nt("adjunct_list_np_predcomp_np_moved")},
    {"name": "adjunct_list_np_predcomp_np_moved", "symbols": ["predcomp_np_moved", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_predcomp_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_to_inf_cl"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["np", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["to_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_np_moved", "symbols": ["np", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("adjunct_list_np_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_np_moved", "symbols": ["bare_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_np_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["np", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl_np_moved", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["np", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl_np_moved", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_exclamative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("adjunct_list_np_exclamative_cl_np_moved")},
    {"name": "adjunct_list_np_exclamative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl_np_moved")},
    {"name": "adjunct_list_np_exclamative_cl_np_moved", "symbols": ["exclamative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_exclamative_cl_np_moved")},
    {"name": "adjunct_list_np_interrogative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("adjunct_list_np_interrogative_cl_np_moved")},
    {"name": "adjunct_list_np_interrogative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl_np_moved")},
    {"name": "adjunct_list_np_interrogative_cl_np_moved", "symbols": ["interrogative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_interrogative_cl_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["adjunct", "adjunct_list_np_np_np_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_np"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["to", "np", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["np", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["np", "adjunct_list_np_do_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_do_moved", "symbols": ["adjunct", "adjunct_list_np_do_moved"], "postprocess": nt("adjunct_list_np_do_moved")},
    {"name": "adjunct_list_np_do_moved", "symbols": ["to", "adjunct_list"], "postprocess": nt("adjunct_list_np_do_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "modal", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf", "adjunct_list_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_predcomp", "adjunct_list_predcomp_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_to_inf_cl", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_bare_inf_cl", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_that_declarative_cl", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_bare_declarative_cl", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_passive_cl", "passive_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np", "adjunct_list_np_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_predcomp", "adjunct_list_np_predcomp_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_to_inf_cl", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_exclamative_cl", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_interrogative_cl", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp_vp?", "vbf_np_np", "adjunct_list_np_np_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb", "adjunct_list_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_predcomp", "adjunct_list_predcomp_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_to_inf_cl", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_bare_inf_cl", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_that_declarative_cl", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_bare_declarative_cl", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_passive_cl", "passive_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np", "adjunct_list_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_predcomp", "adjunct_list_np_predcomp_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_to_inf_cl", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_exclamative_cl", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_interrogative_cl", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp_vp?", "vb_np_np", "adjunct_list_np_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg", "adjunct_list_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_predcomp", "adjunct_list_predcomp_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_to_inf_cl", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_bare_inf_cl", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_that_declarative_cl", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_bare_declarative_cl", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_passive_cl", "passive_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np", "adjunct_list_np_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_predcomp", "adjunct_list_np_predcomp_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_to_inf_cl", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_exclamative_cl", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_interrogative_cl", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp_vp?", "vbg_np_np", "adjunct_list_np_np_np_moved"], "postprocess": nt("vbg_vp_np_moved ")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn", "adjunct_list_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_predcomp", "adjunct_list_predcomp_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_to_inf_cl", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_bare_inf_cl", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_that_declarative_cl", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_bare_declarative_cl", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_passive_cl", "passive_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np", "adjunct_list_np_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_predcomp", "adjunct_list_np_predcomp_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_to_inf_cl", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_that_declarative_cl", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_exclamative_cl", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_interrogative_cl", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp_vp?", "vbn_np_np", "adjunct_list_np_np_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "adjunct_list_adjp_moved", "symbols": ["adjunct_list"], "postprocess": nt("adjunct_list_adjp_moved")},
    {"name": "adjunct_list_predcomp_adjp_moved", "symbols": ["predcomp_adjp_moved", "adjunct_list"], "postprocess": nt("adjunct_list_predcomp_adjp_moved")},
    {"name": "adjunct_list_to_inf_cl_adjp_moved", "symbols": ["adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_to_inf_cl_adjp_moved")},
    {"name": "adjunct_list_to_inf_cl_adjp_moved", "symbols": ["adjunct_list_to_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_to_inf_cl_adjp_moved")},
    {"name": "adjunct_list_to_inf_cl_adjp_moved_", "symbols": ["adjunct", "adjunct_list_to_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_to_inf_cl_adjp_moved_")},
    {"name": "adjunct_list_to_inf_cl_adjp_moved_", "symbols": ["to_inf_cl_adjp_moved", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl_adjp_moved_")},
    {"name": "adjunct_list_bare_inf_cl_adjp_moved", "symbols": ["adjunct_list_bare_inf_cl"], "postprocess": nt("adjunct_list_bare_inf_cl_adjp_moved")},
    {"name": "adjunct_list_bare_inf_cl_adjp_moved", "symbols": ["adjunct_list_bare_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_bare_inf_cl_adjp_moved")},
    {"name": "adjunct_list_bare_inf_cl_adjp_moved_", "symbols": ["bare_inf_cl_adjp_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_inf_cl_adjp_moved_")},
    {"name": "adjunct_list_that_declarative_cl_adjp_moved", "symbols": ["adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_that_declarative_cl_adjp_moved", "symbols": ["adjunct_list_that_declarative_cl_adjp_moved_"], "postprocess": nt("adjunct_list_that_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_that_declarative_cl_adjp_moved_", "symbols": ["adjunct", "adjunct_list_that_declarative_cl_adjp_moved_"], "postprocess": nt("adjunct_list_that_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_that_declarative_cl_adjp_moved_", "symbols": ["that_declarative_cl_adjp_moved", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_bare_declarative_cl_adjp_moved", "symbols": ["adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_bare_declarative_cl_adjp_moved", "symbols": ["adjunct_list_bare_declarative_cl_adjp_moved_"], "postprocess": nt("adjunct_list_bare_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_bare_declarative_cl_adjp_moved_", "symbols": ["adjunct", "adjunct_list_bare_declarative_cl_adjp_moved_"], "postprocess": nt("adjunct_list_bare_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_bare_declarative_cl_adjp_moved_", "symbols": ["bare_declarative_cl_adjp_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_exclamative_cl_adjp_moved", "symbols": ["adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_exclamative_cl_adjp_moved")},
    {"name": "adjunct_list_interrogative_cl_adjp_moved", "symbols": ["adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_interrogative_cl_adjp_moved")},
    {"name": "adjunct_list_np_adjp_moved", "symbols": ["adjunct_list_np"], "postprocess": nt("adjunct_list_np_adjp_moved")},
    {"name": "adjunct_list_np_predcomp_adjp_moved", "symbols": ["np", "adjunct_list_predcomp_adjp_moved"], "postprocess": nt("adjunct_list_np_predcomp_adjp_moved")},
    {"name": "adjunct_list_np_to_inf_cl_adjp_moved", "symbols": ["adjunct_list_np_to_inf_cl"], "postprocess": nt("adjunct_list_np_to_inf_cl_adjp_moved")},
    {"name": "adjunct_list_np_to_inf_cl_adjp_moved", "symbols": ["adjunct_list_np_to_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_to_inf_cl_adjp_moved")},
    {"name": "adjunct_list_np_to_inf_cl_adjp_moved_", "symbols": ["adjunct", "adjunct_list_np_to_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_to_inf_cl_adjp_moved_")},
    {"name": "adjunct_list_np_to_inf_cl_adjp_moved_", "symbols": ["np", "adjunct_list_to_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_to_inf_cl_adjp_moved_")},
    {"name": "adjunct_list_np_bare_inf_cl_adjp_moved", "symbols": ["adjunct_list_np_bare_inf_cl"], "postprocess": nt("adjunct_list_np_bare_inf_cl_adjp_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_adjp_moved", "symbols": ["adjunct_list_np_bare_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_bare_inf_cl_adjp_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_adjp_moved_", "symbols": ["adjunct", "adjunct_list_np_bare_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_bare_inf_cl_adjp_moved_")},
    {"name": "adjunct_list_np_bare_inf_cl_adjp_moved_", "symbols": ["np", "adjunct_list_bare_inf_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_bare_inf_cl_adjp_moved_")},
    {"name": "adjunct_list_np_that_declarative_cl_adjp_moved", "symbols": ["adjunct_list_np_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_adjp_moved", "symbols": ["adjunct_list_np_that_declarative_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_that_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_adjp_moved_", "symbols": ["adjunct", "adjunct_list_np_that_declarative_cl_adjp_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_np_that_declarative_cl_adjp_moved_", "symbols": ["np", "adjunct_list_that_declarative_cl_adjp_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_np_bare_declarative_cl_adjp_moved", "symbols": ["adjunct_list_np_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_adjp_moved", "symbols": ["adjunct_list_np_bare_declarative_cl_adjp_moved_"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_adjp_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_adjp_moved_", "symbols": ["adjunct", "adjunct_list_np_bare_declarative_cl_adjp_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_np_bare_declarative_cl_adjp_moved_", "symbols": ["np", "adjunct_list_bare_declarative_cl_adjp_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_adjp_moved_")},
    {"name": "adjunct_list_np_exclamative_cl_adjp_moved", "symbols": ["adjunct_list_np_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl_adjp_moved")},
    {"name": "adjunct_list_np_interrogative_cl_adjp_moved", "symbols": ["adjunct_list_np_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl_adjp_moved")},
    {"name": "adjunct_list_np_np_adjp_moved", "symbols": ["adjunct_list_np_np"], "postprocess": nt("adjunct_list_np_np_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "modal", "bare_inf_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf", "adjunct_list_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_predcomp", "adjunct_list_predcomp_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_to_inf_cl", "adjunct_list_to_inf_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_bare_inf_cl", "adjunct_list_bare_inf_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_that_declarative_cl", "adjunct_list_that_declarative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_bare_declarative_cl", "adjunct_list_bare_declarative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_exclamative_cl", "adjunct_list_exclamative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_interrogative_cl", "adjunct_list_interrogative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_vbg_cl", "vbg_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_vbn_cl", "vbn_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_passive_cl", "passive_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np", "adjunct_list_np_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_predcomp", "adjunct_list_np_predcomp_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_to_inf_cl", "adjunct_list_np_to_inf_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_exclamative_cl", "adjunct_list_np_exclamative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_interrogative_cl", "adjunct_list_np_interrogative_cl_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "fin_vp_adjp_moved", "symbols": ["advp_vp?", "vbf_np_np", "adjunct_list_np_np_adjp_moved"], "postprocess": nt("fin_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb", "adjunct_list_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_predcomp", "adjunct_list_predcomp_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_to_inf_cl", "adjunct_list_to_inf_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_bare_inf_cl", "adjunct_list_bare_inf_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_that_declarative_cl", "adjunct_list_that_declarative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_bare_declarative_cl", "adjunct_list_bare_declarative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_exclamative_cl", "adjunct_list_exclamative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_interrogative_cl", "adjunct_list_interrogative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_vbg_cl", "vbg_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_vbn_cl", "vbn_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_passive_cl", "passive_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np", "adjunct_list_np_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_predcomp", "adjunct_list_np_predcomp_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_to_inf_cl", "adjunct_list_np_to_inf_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_exclamative_cl", "adjunct_list_np_exclamative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_interrogative_cl", "adjunct_list_np_interrogative_cl_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "inf_vp_adjp_moved", "symbols": ["advp_vp?", "vb_np_np", "adjunct_list_np_np_adjp_moved"], "postprocess": nt("inf_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn", "adjunct_list_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_predcomp", "adjunct_list_predcomp_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_to_inf_cl", "adjunct_list_to_inf_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_bare_inf_cl", "adjunct_list_bare_inf_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_that_declarative_cl", "adjunct_list_that_declarative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_bare_declarative_cl", "adjunct_list_bare_declarative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_exclamative_cl", "adjunct_list_exclamative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_interrogative_cl", "adjunct_list_interrogative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_vbg_cl", "vbg_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_vbn_cl", "vbn_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_passive_cl", "passive_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np", "adjunct_list_np_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_predcomp", "adjunct_list_np_predcomp_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_to_inf_cl", "adjunct_list_np_to_inf_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_exclamative_cl", "adjunct_list_np_exclamative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_interrogative_cl", "adjunct_list_np_interrogative_cl_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbn_vp_adjp_moved", "symbols": ["advp_vp?", "vbn_np_np", "adjunct_list_np_np_adjp_moved"], "postprocess": nt("vbn_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg", "adjunct_list_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_predcomp", "adjunct_list_predcomp_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_to_inf_cl", "adjunct_list_to_inf_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_bare_inf_cl", "adjunct_list_bare_inf_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_that_declarative_cl", "adjunct_list_that_declarative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_bare_declarative_cl", "adjunct_list_bare_declarative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_exclamative_cl", "adjunct_list_exclamative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_interrogative_cl", "adjunct_list_interrogative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_vbg_cl", "vbg_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_vbn_cl", "vbn_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_passive_cl", "passive_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np", "adjunct_list_np_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_predcomp", "adjunct_list_np_predcomp_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_to_inf_cl", "adjunct_list_np_to_inf_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_bare_inf_cl", "adjunct_list_np_bare_inf_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_that_declarative_cl", "adjunct_list_np_that_declarative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_bare_declarative_cl", "adjunct_list_np_bare_declarative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_exclamative_cl", "adjunct_list_np_exclamative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_interrogative_cl", "adjunct_list_np_interrogative_cl_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "vbg_vp_adjp_moved", "symbols": ["advp_vp?", "vbg_np_np", "adjunct_list_np_np_adjp_moved"], "postprocess": nt("vbg_vp_adjp_moved")},
    {"name": "to_inf_cl", "symbols": ["to", "inf_vp"], "postprocess": nt("to_inf_cl")},
    {"name": "to_inf_cl_np_moved", "symbols": ["to", "inf_vp_np_moved"], "postprocess": nt("to_inf_cl_np_moved")},
    {"name": "to_inf_cl_adjp_moved", "symbols": ["to", "inf_vp_adjp_moved"], "postprocess": nt("to_inf_cl_adjp_moved")},
    {"name": "bare_inf_cl", "symbols": ["inf_vp"], "postprocess": nt("bare_inf_cl")},
    {"name": "bare_inf_cl_np_moved", "symbols": ["inf_vp_np_moved"], "postprocess": nt("bare_inf_cl_np_moved")},
    {"name": "bare_inf_cl_adjp_moved", "symbols": ["inf_vp_adjp_moved"], "postprocess": nt("bare_inf_cl_adjp_moved")},
    {"name": "vbg_cl", "symbols": ["vbg_vp"], "postprocess": nt("vbg_cl")},
    {"name": "vbg_cl_np_moved", "symbols": ["vbg_vp_np_moved"], "postprocess": nt("vbg_cl_np_moved")},
    {"name": "vbg_cl_adjp_moved", "symbols": ["vbg_vp_adjp_moved"], "postprocess": nt("vbg_cl_adjp_moved")},
    {"name": "vbn_cl", "symbols": ["vbn_vp"], "postprocess": nt("vbn_cl")},
    {"name": "vbn_cl_np_moved", "symbols": ["vbn_vp_np_moved"], "postprocess": nt("vbn_cl_np_moved")},
    {"name": "vbn_cl_adjp_moved", "symbols": ["vbn_vp_adjp_moved"], "postprocess": nt("vbn_cl_adjp_moved")},
    {"name": "that_declarative_cl", "symbols": ["that", "bare_declarative_cl"], "postprocess": nt("that_declarative_cl")},
    {"name": "bare_declarative_cl", "symbols": ["fin_cl"], "postprocess": nt("bare_declarative_cl")},
    {"name": "exclamative_cl", "symbols": ["ip_advp_vp", "fin_cl"], "postprocess": nt("exclamative_cl")},
    {"name": "exclamative_cl", "symbols": ["ip_adjp", "np", "fin_vp_adjp_moved"], "postprocess": nt("exclamative_cl")},
    {"name": "interrogative_cl", "symbols": ["interrogative_subordinator", "np", "fin_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_np", "fin_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_np", "np", "fin_vp_np_moved"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_pp", "np", "fin_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "ip_advp_vp", "symbols": ["how", "advp_vp"], "postprocess": nt("ip_advp_vp")},
    {"name": "ip_advp_vp", "symbols": ["how"], "postprocess": nt("ip_advp_vp")},
    {"name": "ip_adjp", "symbols": ["how", "adjp"], "postprocess": nt("ip_advp_vp")},
    {"name": "ip_adjp", "symbols": ["how"], "postprocess": nt("ip_advp_vp")},
    {"name": "bare_declarative_cl_np_moved", "symbols": ["fin_vp"], "postprocess": nt("bare_declarative_cl_np_moved")},
    {"name": "bare_declarative_cl_np_moved", "symbols": ["np", "fin_vp_np_moved"], "postprocess": nt("bare_declarative_cl_np_moved")},
    {"name": "that_declarative_cl_np_moved", "symbols": ["that", "bare_declarative_cl_np_moved"], "postprocess": nt("that_declarative_cl_np_moved")},
    {"name": "bare_declarative_cl_adjp_moved", "symbols": ["np", "fin_vp_adjp_moved"], "postprocess": nt("bare_declarative_cl_adjp_moved")},
    {"name": "bare_declarative_cl_adjp_moved", "symbols": ["np", "fin_vp"], "postprocess": nt("bare_declarative_cl_adjp_moved")},
    {"name": "that_declarative_cl_adjp_moved", "symbols": ["that", "bare_declarative_cl_adjp_moved"], "postprocess": nt("that_declarative_cl_adjp_moved")},
    {"name": "passive_cl", "symbols": ["vbn_cl_np_moved"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl_np_moved", "symbols": ["vbn_cl_np_moved"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl_adjp_moved", "symbols": ["vbn_cl_np_moved"], "postprocess": nt("passive_cl")},
    {"name": "ip_np", "symbols": ["who"], "postprocess": nt("ip_np")},
    {"name": "ip_np", "symbols": ["what"], "postprocess": nt("ip_np")},
    {"name": "ip_np", "symbols": ["which"], "postprocess": nt("ip_np")},
    {"name": "ip_np", "symbols": ["ip_det", "adjp_list", "noun", "n_modifier_list"], "postprocess": nt("ip_np")},
    {"name": "ip_det", "symbols": ["which"], "postprocess": nt("ip_det")},
    {"name": "ip_det", "symbols": ["whose"], "postprocess": nt("ip_det")},
    {"name": "np", "symbols": ["precorenp_modifier?", "core_np", "postcorenp_modifier?"], "postprocess": nt("np")},
    {"name": "precorenp_modifier?", "symbols": ["precorenp_modifier"], "postprocess": nt("precorenp_modifier?")},
    {"name": "precorenp_modifier?", "symbols": [], "postprocess": nt("precorenp_modifier?")},
    {"name": "postcorenp_modifier?", "symbols": ["postcorenp_modifier"], "postprocess": nt("postcorenp_modifier?")},
    {"name": "postcorenp_modifier?", "symbols": [], "postprocess": nt("postcorenp_modifier?")},
    {"name": "whichable_np", "symbols": ["adjp_list", "noun", "n_modifier_list"], "postprocess": nt("whichable_np")},
    {"name": "core_np", "symbols": ["proper_noun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["pronoun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["independent_genitive_pronoun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["predeterminer_modifier?", "determiner?", "adjp_list", "noun", "n_modifier_list"], "postprocess": nt("core_np")},
    {"name": "number", "symbols": ["digits"]},
    {"name": "number", "symbols": ["cardinal_number_eng"], "postprocess": nt("number")},
    {"name": "quantificational_expression", "symbols": ["quantificational_modifier"], "postprocess": nt("quantificational_expression")},
    {"name": "quantificational_expression", "symbols": ["number", "fraction_denominator"], "postprocess": nt("quantificational_expression")},
    {"name": "quantificational_expression", "symbols": ["number", "times"], "postprocess": nt("quantificational_expression")},
    {"name": "precore_emphatic_expression", "symbols": ["precore_emphatic_modifier"], "postprocess": nt("precore_emphatic_modifier")},
    {"name": "precore_emphatic_expression", "symbols": ["precore_emphatic_modifier_adjp", "adjp"], "postprocess": nt("precore_emphatic_modifier")},
    {"name": "predeterminer_modifier?", "symbols": [], "postprocess": nt("predeterminer_modifier")},
    {"name": "predeterminer_modifier?", "symbols": ["quantificational_expression"], "postprocess": nt("predeterminer_modifier")},
    {"name": "predeterminer_modifier?", "symbols": ["precore_emphatic_expression"], "postprocess": nt("predeterminer_modifier")},
    {"name": "relative_ip_np_subj", "symbols": ["who"], "postprocess": nt("relative_ip_np_subj")},
    {"name": "relative_ip_np_subj", "symbols": ["which"], "postprocess": nt("relative_ip_np_subj")},
    {"name": "relative_ip_np_subj", "symbols": ["that"], "postprocess": nt("relative_ip_np_subj")},
    {"name": "relative_ip_np_obj", "symbols": [], "postprocess": nt("relative_ip_np_")},
    {"name": "relative_ip_np_obj", "symbols": ["that"], "postprocess": nt("relative_ip_np_")},
    {"name": "relative_ip_np_obj", "symbols": ["ip_np"], "postprocess": nt("relative_ip_np_")},
    {"name": "restrictive_cl", "symbols": ["relative_ip_np_subj", "fin_vp"], "postprocess": nt("restrictive_cl")},
    {"name": "restrictive_cl", "symbols": ["relative_ip_np_obj", "np", "fin_vp_np_moved"], "postprocess": nt("restrictive_cl")},
    {"name": "n_modifier", "symbols": ["restrictive_cl"], "postprocess": nt("n_modifier")},
    {"name": "n_modifier", "symbols": ["pp"], "postprocess": nt("n_modifier")},
    {"name": "n_modifier", "symbols": ["passive_cl"], "postprocess": nt("n_modifier")},
    {"name": "n_modifier_list$ebnf$1", "symbols": []},
    {"name": "n_modifier_list$ebnf$1", "symbols": ["n_modifier_list$ebnf$1", "n_modifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "n_modifier_list", "symbols": ["n_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("n_modifier_list")},
    {"name": "determiner?", "symbols": [], "postprocess": nt("determiner")},
    {"name": "determiner?", "symbols": ["dp"], "postprocess": nt("determiner")},
    {"name": "determiner?", "symbols": ["genitive_np"], "postprocess": nt("determiner")},
    {"name": "genitive_np", "symbols": ["np", "s"], "postprocess": nt("genitive_np")},
    {"name": "genitive_np", "symbols": ["dependent_genitive_pronoun"], "postprocess": nt("genitive_np")},
    {"name": "dp_modifier?", "symbols": [], "postprocess": nt("dp_modifier?")},
    {"name": "dp_modifier?", "symbols": ["dp_modifier"], "postprocess": nt("dp_modifier?")},
    {"name": "dp", "symbols": ["dp_modifier?", "core_dp"], "postprocess": nt("dp")},
    {"name": "core_dp", "symbols": ["determinative"], "postprocess": nt("core_dp")},
    {"name": "core_dp", "symbols": ["number"], "postprocess": nt("core_dp")},
    {"name": "adjunct", "symbols": ["pp"], "postprocess": nt("adjunct")},
    {"name": "adjunct", "symbols": ["advp_vp"], "postprocess": nt("adjunct")},
    {"name": "adjunct_np_moved", "symbols": ["pp_np_moved"], "postprocess": nt("adjunct")},
    {"name": "ip_pp", "symbols": ["where"], "postprocess": nt("ip_pp")},
    {"name": "ip_pp", "symbols": ["when"], "postprocess": nt("ip_pp")},
    {"name": "ip_pp", "symbols": ["why"], "postprocess": nt("ip_pp")},
    {"name": "ip_pp", "symbols": ["preposition_np", "ip_np"], "postprocess": nt("ip_pp")},
    {"name": "pp", "symbols": ["preposition"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_np", "np"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_predcomp", "predcomp"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_advp", "advp"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_bare_declarative_cl", "bare_declarative_cl"], "postprocess": nt("pp")},
    {"name": "pp_np_moved", "symbols": ["preposition_np"], "postprocess": nt("pp_np_moved")},
    {"name": "predcomp", "symbols": ["adjp"], "postprocess": nt("predcomp")},
    {"name": "predcomp_np_moved", "symbols": ["adjp_np_moved"], "postprocess": nt("predcomp_np_moved")},
    {"name": "predcomp_adjp_moved", "symbols": [], "postprocess": nt("predcomp_adjp_moved")},
    {"name": "adjp", "symbols": ["advp", "adjp"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_pp", "pp"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_bare_declarative_cl", "bare_declarative_cl"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_that_declarative_cl", "that_declarative_cl"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_to_inf_cl", "to_inf_cl"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["proper_noun"], "postprocess": nt("adjp")},
    {"name": "adjp_np_moved", "symbols": ["advp", "adjp_np_moved"], "postprocess": nt("adjp_np_moved")},
    {"name": "adjp_np_moved", "symbols": ["adj_pp", "preposition"], "postprocess": nt("adjp_np_moved")},
    {"name": "adjp_np_moved", "symbols": ["adj_that_declarative_cl", "that_declarative_cl_np_moved"], "postprocess": nt("adjp_np_moved")},
    {"name": "adjp_np_moved", "symbols": ["adj_bare_declarative_cl", "bare_declarative_cl_np_moved"], "postprocess": nt("adjp_np_moved")},
    {"name": "adjp_np_moved", "symbols": ["adj_to_inf_cl", "to_inf_cl_np_moved"], "postprocess": nt("adjp_np_moved")},
    {"name": "adjp_list$ebnf$1", "symbols": []},
    {"name": "adjp_list$ebnf$1", "symbols": ["adjp_list$ebnf$1", "adjp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "adjp_list", "symbols": ["adjp_list$ebnf$1"], "postprocess": nonterminal_unpack("adjp_list")},
    {"name": "advp", "symbols": ["adv"], "postprocess": nt("advp")},
    {"name": "advp", "symbols": ["adv", "advp"], "postprocess": nt("advp")},
    {"name": "advp_vp", "symbols": ["adv_vp"], "postprocess": nt("advp_vp")},
    {"name": "advp_vp", "symbols": ["adv", "advp_vp"], "postprocess": nt("advp_vp")},
    {"name": "advp_vp?", "symbols": ["advp_vp"], "postprocess": nt("advp_vp?")},
    {"name": "advp_vp?", "symbols": [], "postprocess": nt("advp_vp?")},
    {"name": "advp?", "symbols": ["advp"], "postprocess": nt("advp?")},
    {"name": "advp?", "symbols": [], "postprocess": nt("advp?")},
    {"name": "not?", "symbols": ["not"], "postprocess": nt("not?")},
    {"name": "not?", "symbols": [], "postprocess": nt("not?")},
    {"name": "determinative", "symbols": [determinative], "postprocess": t("determinative")},
    {"name": "dp_modifier", "symbols": [dp_modifier], "postprocess": t("dp_modifier")},
    {"name": "pronoun", "symbols": [pronoun], "postprocess": t("pronoun")},
    {"name": "dependent_genitive_pronoun", "symbols": [dependent_genitive_pronoun], "postprocess": t("dependent_genitive_pronoun")},
    {"name": "independent_genitive_pronoun", "symbols": [independent_genitive_pronoun], "postprocess": t("independent_genitive_pronoun")},
    {"name": "proper_noun", "symbols": [proper_noun], "postprocess": t("proper_noun")},
    {"name": "noun", "symbols": [noun], "postprocess": t("noun")},
    {"name": "preposition", "symbols": [preposition], "postprocess": t("preposition")},
    {"name": "preposition_np", "symbols": [preposition_np], "postprocess": t("preposition_np")},
    {"name": "preposition_predcomp", "symbols": [preposition_predcomp], "postprocess": t("preposition_predcomp")},
    {"name": "preposition_pp", "symbols": [preposition_pp], "postprocess": t("preposition_pp")},
    {"name": "preposition_advp", "symbols": [preposition_advp], "postprocess": t("preposition_advp")},
    {"name": "preposition_bare_declarative_cl", "symbols": [preposition_bare_declarative_cl], "postprocess": t("preposition_bare_declarative_cl")},
    {"name": "to", "symbols": [to], "postprocess": t("to")},
    {"name": "s", "symbols": [s], "postprocess": t("s")},
    {"name": "not", "symbols": [not], "postprocess": t("not")},
    {"name": "that", "symbols": [that], "postprocess": t("that")},
    {"name": "interrogative_subordinator", "symbols": [interrogative_subordinator], "postprocess": t("interrogative_subordinator")},
    {"name": "times", "symbols": [times], "postprocess": t("times")},
    {"name": "cardinal_number_eng", "symbols": [cardinal_number_eng], "postprocess": t("cardinal_number_eng")},
    {"name": "digits", "symbols": [digits], "postprocess": t("digits")},
    {"name": "fraction_denominator", "symbols": [fraction_denominator], "postprocess": t("fraction_denominator")},
    {"name": "modal", "symbols": [modal], "postprocess": t("modal")},
    {"name": "aux_vbf_predcomp", "symbols": [aux_vbf_predcomp], "postprocess": t("aux_vbf_predcomp")},
    {"name": "aux_vbf_np", "symbols": [aux_vbf_np], "postprocess": t("aux_vbf_np")},
    {"name": "aux_vbf_vbg_cl", "symbols": [aux_vbf_vbg_cl], "postprocess": t("aux_vbf_vbg_cl")},
    {"name": "aux_vbf_vbn_cl", "symbols": [aux_vbf_vbn_cl], "postprocess": t("aux_vbf_vbn_cl")},
    {"name": "aux_vbf_passive_cl", "symbols": [aux_vbf_passive_cl], "postprocess": t("aux_vbf_passive_cl")},
    {"name": "aux_vbf_bare_inf_cl", "symbols": [aux_vbf_bare_inf_cl], "postprocess": t("aux_vbf_bare_inf_cl")},
    {"name": "vb", "symbols": [vb], "postprocess": t("vb")},
    {"name": "vb_predcomp", "symbols": [vb_predcomp], "postprocess": t("vb_predcomp")},
    {"name": "vb_to_inf_cl", "symbols": [vb_to_inf_cl], "postprocess": t("vb_to_inf_cl")},
    {"name": "vb_bare_inf_cl", "symbols": [vb_bare_inf_cl], "postprocess": t("vb_bare_inf_cl")},
    {"name": "vb_that_declarative_cl", "symbols": [vb_that_declarative_cl], "postprocess": t("vb_that_declarative_cl")},
    {"name": "vb_bare_declarative_cl", "symbols": [vb_bare_declarative_cl], "postprocess": t("vb_bare_declarative_cl")},
    {"name": "vb_exclamative_cl", "symbols": [vb_exclamative_cl], "postprocess": t("vb_exclamative_cl")},
    {"name": "vb_interrogative_cl", "symbols": [vb_interrogative_cl], "postprocess": t("vb_interrogative_cl")},
    {"name": "vb_vbg_cl", "symbols": [vb_vbg_cl], "postprocess": t("vb_vbg_cl")},
    {"name": "vb_vbn_cl", "symbols": [vb_vbn_cl], "postprocess": t("vb_vbn_cl")},
    {"name": "vb_passive_cl", "symbols": [vb_passive_cl], "postprocess": t("vb_passive_cl")},
    {"name": "vb_np", "symbols": [vb_np], "postprocess": t("vb_np")},
    {"name": "vb_np_predcomp", "symbols": [vb_np_predcomp], "postprocess": t("vb_np_predcomp")},
    {"name": "vb_np_to_inf_cl", "symbols": [vb_np_to_inf_cl], "postprocess": t("vb_np_to_inf_cl")},
    {"name": "vb_np_bare_inf_cl", "symbols": [vb_np_bare_inf_cl], "postprocess": t("vb_np_bare_inf_cl")},
    {"name": "vb_np_that_declarative_cl", "symbols": [vb_np_that_declarative_cl], "postprocess": t("vb_np_that_declarative_cl")},
    {"name": "vb_np_bare_declarative_cl", "symbols": [vb_np_bare_declarative_cl], "postprocess": t("vb_np_bare_declarative_cl")},
    {"name": "vb_np_exclamative_cl", "symbols": [vb_np_exclamative_cl], "postprocess": t("vb_np_exclamative_cl")},
    {"name": "vb_np_interrogative_cl", "symbols": [vb_np_interrogative_cl], "postprocess": t("vb_np_interrogative_cl")},
    {"name": "vb_np_np", "symbols": [vb_np_np], "postprocess": t("vb_np_np")},
    {"name": "vbg", "symbols": [vbg], "postprocess": t("vbg")},
    {"name": "vbg_predcomp", "symbols": [vbg_predcomp], "postprocess": t("vbg_predcomp")},
    {"name": "vbg_to_inf_cl", "symbols": [vbg_to_inf_cl], "postprocess": t("vbg_to_inf_cl")},
    {"name": "vbg_bare_inf_cl", "symbols": [vbg_bare_inf_cl], "postprocess": t("vbg_bare_inf_cl")},
    {"name": "vbg_that_declarative_cl", "symbols": [vbg_that_declarative_cl], "postprocess": t("vbg_that_declarative_cl")},
    {"name": "vbg_bare_declarative_cl", "symbols": [vbg_bare_declarative_cl], "postprocess": t("vbg_bare_declarative_cl")},
    {"name": "vbg_exclamative_cl", "symbols": [vbg_exclamative_cl], "postprocess": t("vbg_exclamative_cl")},
    {"name": "vbg_interrogative_cl", "symbols": [vbg_interrogative_cl], "postprocess": t("vbg_interrogative_cl")},
    {"name": "vbg_vbg_cl", "symbols": [vbg_vbg_cl], "postprocess": t("vbg_vbg_cl")},
    {"name": "vbg_vbn_cl", "symbols": [vbg_vbn_cl], "postprocess": t("vbg_vbn_cl")},
    {"name": "vbg_passive_cl", "symbols": [vbg_passive_cl], "postprocess": t("vbg_passive_cl")},
    {"name": "vbg_np", "symbols": [vbg_np], "postprocess": t("vbg_np")},
    {"name": "vbg_np_predcomp", "symbols": [vbg_np_predcomp], "postprocess": t("vbg_np_predcomp")},
    {"name": "vbg_np_to_inf_cl", "symbols": [vbg_np_to_inf_cl], "postprocess": t("vbg_np_to_inf_cl")},
    {"name": "vbg_np_bare_inf_cl", "symbols": [vbg_np_bare_inf_cl], "postprocess": t("vbg_np_bare_inf_cl")},
    {"name": "vbg_np_that_declarative_cl", "symbols": [vbg_np_that_declarative_cl], "postprocess": t("vbg_np_that_declarative_cl")},
    {"name": "vbg_np_bare_declarative_cl", "symbols": [vbg_np_bare_declarative_cl], "postprocess": t("vbg_np_bare_declarative_cl")},
    {"name": "vbg_np_exclamative_cl", "symbols": [vbg_np_exclamative_cl], "postprocess": t("vbg_np_exclamative_cl")},
    {"name": "vbg_np_interrogative_cl", "symbols": [vbg_np_interrogative_cl], "postprocess": t("vbg_np_interrogative_cl")},
    {"name": "vbg_np_np", "symbols": [vbg_np_np], "postprocess": t("vbg_np_np")},
    {"name": "vbn", "symbols": [vbn], "postprocess": t("vbn")},
    {"name": "vbn_predcomp", "symbols": [vbn_predcomp], "postprocess": t("vbn_predcomp")},
    {"name": "vbn_to_inf_cl", "symbols": [vbn_to_inf_cl], "postprocess": t("vbn_to_inf_cl")},
    {"name": "vbn_bare_inf_cl", "symbols": [vbn_bare_inf_cl], "postprocess": t("vbn_bare_inf_cl")},
    {"name": "vbn_that_declarative_cl", "symbols": [vbn_that_declarative_cl], "postprocess": t("vbn_that_declarative_cl")},
    {"name": "vbn_bare_declarative_cl", "symbols": [vbn_bare_declarative_cl], "postprocess": t("vbn_bare_declarative_cl")},
    {"name": "vbn_exclamative_cl", "symbols": [vbn_exclamative_cl], "postprocess": t("vbn_exclamative_cl")},
    {"name": "vbn_interrogative_cl", "symbols": [vbn_interrogative_cl], "postprocess": t("vbn_interrogative_cl")},
    {"name": "vbn_vbg_cl", "symbols": [vbn_vbg_cl], "postprocess": t("vbn_vbg_cl")},
    {"name": "vbn_vbn_cl", "symbols": [vbn_vbn_cl], "postprocess": t("vbn_vbn_cl")},
    {"name": "vbn_passive_cl", "symbols": [vbn_passive_cl], "postprocess": t("vbn_passive_cl")},
    {"name": "vbn_np", "symbols": [vbn_np], "postprocess": t("vbn_np")},
    {"name": "vbn_np_predcomp", "symbols": [vbn_np_predcomp], "postprocess": t("vbn_np_predcomp")},
    {"name": "vbn_np_to_inf_cl", "symbols": [vbn_np_to_inf_cl], "postprocess": t("vbn_np_to_inf_cl")},
    {"name": "vbn_np_bare_inf_cl", "symbols": [vbn_np_bare_inf_cl], "postprocess": t("vbn_np_bare_inf_cl")},
    {"name": "vbn_np_that_declarative_cl", "symbols": [vbn_np_that_declarative_cl], "postprocess": t("vbn_np_that_declarative_cl")},
    {"name": "vbn_np_bare_declarative_cl", "symbols": [vbn_np_bare_declarative_cl], "postprocess": t("vbn_np_bare_declarative_cl")},
    {"name": "vbn_np_exclamative_cl", "symbols": [vbn_np_exclamative_cl], "postprocess": t("vbn_np_exclamative_cl")},
    {"name": "vbn_np_interrogative_cl", "symbols": [vbn_np_interrogative_cl], "postprocess": t("vbn_np_interrogative_cl")},
    {"name": "vbn_np_np", "symbols": [vbn_np_np], "postprocess": t("vbn_np_np")},
    {"name": "vbf", "symbols": [vbf], "postprocess": t("vbf")},
    {"name": "vbf_predcomp", "symbols": [vbf_predcomp], "postprocess": t("vbf_predcomp")},
    {"name": "vbf_to_inf_cl", "symbols": [vbf_to_inf_cl], "postprocess": t("vbf_to_inf_cl")},
    {"name": "vbf_bare_inf_cl", "symbols": [vbf_bare_inf_cl], "postprocess": t("vbf_bare_inf_cl")},
    {"name": "vbf_that_declarative_cl", "symbols": [vbf_that_declarative_cl], "postprocess": t("vbf_that_declarative_cl")},
    {"name": "vbf_bare_declarative_cl", "symbols": [vbf_bare_declarative_cl], "postprocess": t("vbf_bare_declarative_cl")},
    {"name": "vbf_exclamative_cl", "symbols": [vbf_exclamative_cl], "postprocess": t("vbf_exclamative_cl")},
    {"name": "vbf_interrogative_cl", "symbols": [vbf_interrogative_cl], "postprocess": t("vbf_interrogative_cl")},
    {"name": "vbf_vbg_cl", "symbols": [vbf_vbg_cl], "postprocess": t("vbf_vbg_cl")},
    {"name": "vbf_vbn_cl", "symbols": [vbf_vbn_cl], "postprocess": t("vbf_vbn_cl")},
    {"name": "vbf_passive_cl", "symbols": [vbf_passive_cl], "postprocess": t("vbf_passive_cl")},
    {"name": "vbf_np", "symbols": [vbf_np], "postprocess": t("vbf_np")},
    {"name": "vbf_np_predcomp", "symbols": [vbf_np_predcomp], "postprocess": t("vbf_np_predcomp")},
    {"name": "vbf_np_to_inf_cl", "symbols": [vbf_np_to_inf_cl], "postprocess": t("vbf_np_to_inf_cl")},
    {"name": "vbf_np_bare_inf_cl", "symbols": [vbf_np_bare_inf_cl], "postprocess": t("vbf_np_bare_inf_cl")},
    {"name": "vbf_np_that_declarative_cl", "symbols": [vbf_np_that_declarative_cl], "postprocess": t("vbf_np_that_declarative_cl")},
    {"name": "vbf_np_bare_declarative_cl", "symbols": [vbf_np_bare_declarative_cl], "postprocess": t("vbf_np_bare_declarative_cl")},
    {"name": "vbf_np_exclamative_cl", "symbols": [vbf_np_exclamative_cl], "postprocess": t("vbf_np_exclamative_cl")},
    {"name": "vbf_np_interrogative_cl", "symbols": [vbf_np_interrogative_cl], "postprocess": t("vbf_np_interrogative_cl")},
    {"name": "vbf_np_np", "symbols": [vbf_np_np], "postprocess": t("vbf_np_np")},
    {"name": "adj", "symbols": [adj], "postprocess": t("adj")},
    {"name": "adj_pp", "symbols": [adj_pp], "postprocess": t("adj_pp")},
    {"name": "adj_that_declarative_cl", "symbols": [adj_that_declarative_cl], "postprocess": t("adj_that_declarative_cl")},
    {"name": "adj_bare_declarative_cl", "symbols": [adj_bare_declarative_cl], "postprocess": t("adj_bare_declarative_cl")},
    {"name": "adj_to_inf_cl", "symbols": [adj_to_inf_cl], "postprocess": t("adj_to_inf_cl")},
    {"name": "adv", "symbols": [adv], "postprocess": t("adv")},
    {"name": "adv_vp", "symbols": [adv_vp], "postprocess": t("adv_vp")},
    {"name": "who", "symbols": [who], "postprocess": t("who")},
    {"name": "whose", "symbols": [whose], "postprocess": t("whose")},
    {"name": "what", "symbols": [what], "postprocess": t("what")},
    {"name": "which", "symbols": [which], "postprocess": t("which")},
    {"name": "where", "symbols": [where], "postprocess": t("where")},
    {"name": "when", "symbols": [when], "postprocess": t("when")},
    {"name": "why", "symbols": [why], "postprocess": t("why")},
    {"name": "how", "symbols": [how], "postprocess": t("how")},
    {"name": "precorenp_modifier", "symbols": [precorenp_modifier], "postprocess": t("precorenp_modifier")},
    {"name": "postcorenp_modifier", "symbols": [postcorenp_modifier], "postprocess": t("postcorenp_modifier")},
    {"name": "precore_emphatic_modifier", "symbols": [precore_emphatic_modifier], "postprocess": t("precore_emphatic_modifier")},
    {"name": "precore_emphatic_modifier_adjp", "symbols": [precore_emphatic_modifier_adjp], "postprocess": t("precore_emphatic_modifier_adjp ")},
    {"name": "quantificational_modifier", "symbols": [quantificational_modifier], "postprocess": t("quantificational_modifier")},
    {"name": "period", "symbols": [period], "postprocess": t("period")},
    {"name": "question_mark", "symbols": [question_mark], "postprocess": t("question_mark")},
    {"name": "exclamation_mark", "symbols": [exclamation_mark], "postprocess": t("exclamation_mark")}
];
let ParserStart = "text";
export default { Lexer, ParserRules, ParserStart };
