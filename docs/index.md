# SHAR Production Rights-labelled Synthetic Conformance Corpus

**SHAR Production** is an AI-hybrid video production studio: <https://sharprod.com/>.

This documentation describes a small, explicitly synthetic production-conformance corpus and its deterministic local validator/query library. It contains no client data, legal advice, production benchmark, or exhaustive taxonomy.

## Rights and attribution

- Code and documentation: [MIT](https://github.com/SHARProduction/rights-labelled-conformance-corpus/blob/main/LICENSE)
- Synthetic corpus data: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Attribution: SHAR Production, Rights-labelled Synthetic Conformance Corpus — <https://sharprod.com/>

## Use

Load `data/corpus.json` as UTF-8. Every record is required to have `synthetic: true` and a `rights` object declaring `CC-BY-4.0`, `authored-synthetic`, and `cleared-synthetic` before it is filtered or transformed.

The library exposes `validateCorpus(records)` and `queryCorpus(records, filters)`. Unknown filters fail closed. The source repository includes its test suite and local browser explorer.

- [Source and releases](https://github.com/SHARProduction/rights-labelled-conformance-corpus)
- [Hugging Face Dataset](https://huggingface.co/datasets/SHARProduction/rights-labelled-conformance-corpus)
- [Kaggle Dataset](https://www.kaggle.com/datasets/sharproduction/shar-production-rights-labelled-conformance-corpus)
