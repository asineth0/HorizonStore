import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt(
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/unified-signatures": "off",
            "vue/no-multiple-template-root": "off",
            "vue/multi-word-component-names": "off",
            "vue/valid-v-slot": "off",
        },
    },
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    {
        rules: {
            "prettier/prettier": ["error", { endOfLine: "auto" }],
        },
    },
);
