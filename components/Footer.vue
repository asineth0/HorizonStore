<template>
    <div class="footer">
        <div class="footer__store container">
            <div class="footer__brand">
                <img :src="brandLogo" alt="Horizon logo" />
                <div class="footer__copyright">
                    <p>
                        {{
                            $t("footer.copyright", {
                                storeName: appConfig.storeName,
                            })
                        }}
                    </p>
                </div>
            </div>
            <div class="footer__links">
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
        </div>

        <div class="footer__tebex">
            <div class="footer__tebex-inner container">
                <div class="footer__tebex-description">
                    <a
                        :href="`https://www.tebex.io/?utm_source=store&utm_campaign=${appConfig.storeId}`"
                    >
                        <Icon
                            name="tebex"
                            width="51px"
                            :font-controlled="false"
                        />
                    </a>
                    <p>
                        {{ $t("footer.tebex.description") }}
                    </p>
                </div>

                <div class="footer__tebex__links">
                    <a href="https://checkout.tebex.io/impressum">
                        {{ $t("footer.tebex.impressum") }}
                    </a>
                    <a href="https://checkout.tebex.io/terms">
                        {{ $t("footer.tebex.tos") }}
                    </a>
                    <a href="https://checkout.tebex.io/privacy">
                        {{ $t("footer.tebex.privacy_policy") }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import brandLogo from "~/assets/branding/horizon-wildlands-smp-icon-bg.png";

const appConfig = useAppConfig();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.footer {
    width: 100%;
    background-color: $footer-bg;
    backdrop-filter: blur(18px);
    border-top: 1px solid rgba(255, 255, 255, 0.06);

    &__store {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        margin: 0 auto;
        width: 100%;
        justify-content: space-between;
        padding: 22px 20px;
        gap: 15px;

        @include tools.media-breakpoint-up("md") {
            height: $footer-height;
            padding: 0 38px;
        }
    }

    &__brand {
        display: flex;
        align-items: center;
        gap: 16px;

        img {
            width: 56px;
            height: 56px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22);
        }
    }

    &__tebex {
        display: flex;
        align-items: center;
        font-family: "Manrope";
        background-color: $footer-tebex-bg;
        color: $footer-tebex-color;
        font-size: $footer-tebex-font-size;
        border-top: 1px solid rgba(255, 255, 255, 0.06);

        &-inner {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 14px 24px;
            width: 100%;
            margin: 0 auto;
            min-height: $footer-tebex-height;
            padding: 14px 20px;

            @include tools.media-breakpoint-up("md") {
                flex-wrap: nowrap;
                padding: 14px 38px;
            }
        }

        &-description {
            display: flex;
            align-items: center;
            gap: 18px;
            min-width: 0;

            a {
                display: inline-flex;
                flex: 0 0 auto;
                align-items: center;
            }

            svg {
                display: block;
                min-width: 51px;
            }

            p {
                min-width: 0;
                @include tools.media-breakpoint-up("md") {
                    max-width: 760px;
                }

                @include tools.media-breakpoint-up("lg") {
                    max-width: initial;
                }
            }
        }

        p {
            margin-bottom: 0;
        }

        &__links {
            display: flex;
            width: 100%;
            justify-content: flex-start;
            gap: 18px;
            flex-wrap: wrap;

            @include tools.media-breakpoint-up("md") {
                margin-left: auto;
                width: auto;
                flex: 0 0 auto;
                justify-content: flex-end;
            }

            a + a {
                margin-left: 0;
            }
        }
    }

    &__copyright {
        p,
        small {
            margin-bottom: 0;
            color: $footer-copyright-color;
        }

        p {
            font-weight: 700;
        }
    }

    &__links {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
    }
}
</style>
