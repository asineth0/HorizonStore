<template>
    <footer class="footer">
        <div class="footer__main container">
            <div class="footer__top">
                <p class="footer__copyright">
                    {{
                        $t("footer.copyright", {
                            storeName: appConfig.storeName,
                        })
                    }}
                </p>

                <Button
                    v-if="appConfig.discordUrl"
                    tag="a"
                    :href="appConfig.discordUrl"
                    variant="secondary"
                    prepend-icon="discord"
                >
                    {{ $t("footer.join_our_discord") }}
                </Button>
            </div>

            <div class="footer__notes">
                <p>{{ $t("footer.support_note") }}</p>
                <p class="footer__notes--muted">
                    {{ $t("footer.disclaimer") }}
                </p>
            </div>
        </div>

        <div class="footer__tebex">
            <div class="footer__tebex-inner container">
                <a
                    class="footer__tebex-brand"
                    :href="`https://www.tebex.io/?utm_source=store&utm_campaign=${appConfig.storeId}`"
                    aria-label="Tebex"
                >
                    <Icon name="tebex" width="51px" :font-controlled="false" />
                </a>
                <p class="footer__tebex-description">
                    {{ $t("footer.tebex.description") }}
                </p>
                <nav class="footer__tebex-links">
                    <a href="https://checkout.tebex.io/impressum">
                        {{ $t("footer.tebex.impressum") }}
                    </a>
                    <a href="https://checkout.tebex.io/terms">
                        {{ $t("footer.tebex.tos") }}
                    </a>
                    <a href="https://checkout.tebex.io/privacy">
                        {{ $t("footer.tebex.privacy_policy") }}
                    </a>
                </nav>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.footer {
    width: 100%;
    background-color: $footer-bg;

    &__main {
        padding: 24px 20px 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        @include tools.media-breakpoint-up("md") {
            padding: 28px 38px 24px;
        }
    }

    &__top {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;

        @include tools.media-breakpoint-up("md") {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

    &__copyright {
        margin: 0;
        color: $footer-copyright-color;
        font-size: 14px;
    }

    &__notes {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 820px;

        p {
            margin: 0;
            color: $footer-copyright-color;
            font-size: 12px;
            line-height: 1.55;
        }

        &--muted {
            opacity: 0.7;
        }
    }

    &__tebex {
        background-color: $footer-tebex-bg;
        color: $footer-tebex-color;
        font-family: "Lato";
        font-size: $footer-tebex-font-size;
        border-top: 1px solid rgba(255, 255, 255, 0.04);

        &-inner {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 14px 20px;

            @include tools.media-breakpoint-up("md") {
                flex-direction: row;
                align-items: center;
                gap: 20px;
                padding: 10px 38px;
                min-height: $footer-tebex-height;
            }
        }

        &-brand {
            display: inline-flex;
            align-items: center;

            svg {
                min-width: 51px;
            }
        }

        &-description {
            margin: 0;
            flex: 1;
            line-height: 1.5;

            @include tools.media-breakpoint-up("md") {
                max-width: 560px;
            }
        }

        &-links {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;

            a {
                color: inherit;
            }
        }
    }
}
</style>
