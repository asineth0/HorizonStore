<template>
    <div class="hero">
        <div class="hero__background">
            <NuxtImg
                class="hero__image"
                :src="image"
                :alt="title"
                loading="lazy"
            />
        </div>
        <div class="hero__noise"></div>
        <div class="hero__orb hero__orb--one"></div>
        <div class="hero__orb hero__orb--two"></div>

        <div class="hero__content">
            <div class="hero__copy">
                <div class="hero__pill">Wildlands SMP</div>
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>

                <div class="hero__actions">
                    <PlayButton size="lg" />

                    <Button
                        v-if="appConfig.discordUrl"
                        tag="a"
                        :href="appConfig.discordUrl"
                        variant="secondary"
                        size="lg"
                        prepend-icon="discord"
                    >
                        Join the Discord
                    </Button>
                </div>

                <div class="hero__tags">
                    <span>Premium ranks</span>
                    <span>Crate keys</span>
                    <span>Exclusive perks</span>
                </div>
            </div>

            <div class="hero__panel">
                <img class="hero__logo" :src="brandMark" alt="Horizon logo" />
                <div class="hero__panel-copy">
                    <span class="hero__panel-label">Top unlocks</span>
                    <strong>Ranks, keys, and power boosts</strong>
                    <span
                        >Support Horizon while leveling up every session.</span
                    >
                </div>
                <div class="hero__panel-list">
                    <div>
                        <small>What you get</small>
                        <strong>Ranks, crates, cosmetics</strong>
                    </div>
                    <div>
                        <small>Why it matters</small>
                        <strong>Funds events, upkeep, and new content</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import brandMark from "~/assets/branding/horizon-wildlands-smp-icon-bg.png";

interface HeroProps {
    title: string;
    subtitle: string;
    image: string;
}

defineProps<HeroProps>();

const appConfig = useAppConfig();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.hero {
    position: relative;
    width: min(calc(100% - 48px), 1320px);
    height: $hero-banner-height;
    display: grid;
    align-items: stretch;
    border-radius: $hero-banner-border-radius;
    overflow: hidden;
    box-shadow: var(--horizon-shadow);
    border: 1px solid rgba(187, 140, 255, 0.16);
    margin: 0 auto;

    @if ($hero-gradient) {
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: $hero-gradient;
            z-index: 1;
            opacity: 0.64;
        }
    }

    &__content {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 40px 24px 34px;
        color: $hero-banner-color;

        @include tools.media-breakpoint-up("md") {
            grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.62fr);
            align-items: center;
            gap: 42px;
            padding: 54px 50px 42px;
        }
    }

    &__copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        max-width: 48rem;

        h1 {
            color: inherit;
            max-width: 720px;
            margin-bottom: 18px;
            line-height: 0.96;
            font-size: clamp(2.8rem, 4vw, 4.45rem);
            letter-spacing: -0.04em;
            text-wrap: balance;
        }

        p {
            max-width: 38rem;
            margin-bottom: 0;
            font-size: 1.02rem;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.86);
        }
    }

    &__background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: $hero-background-opacity;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 55%;
        transform: scale(1.015);
        filter: saturate(1.08) contrast(1.08) brightness(0.86);
    }

    &__pill,
    &__tags span,
    &__panel {
        backdrop-filter: blur(16px);
    }

    &__pill {
        width: fit-content;
        margin-bottom: 18px;
        padding: 10px 16px;
        border-radius: 9999px;
        background: rgba(187, 140, 255, 0.14);
        border: 1px solid rgba(187, 140, 255, 0.2);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    &__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 30px;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;

        span {
            padding: 9px 14px;
            border-radius: 9999px;
            background: rgba(15, 8, 24, 0.6);
            border: 1px solid rgba(187, 140, 255, 0.12);
            font-size: 0.88rem;
        }
    }

    &__panel {
        display: grid;
        gap: 18px;
        align-self: center;
        justify-self: end;
        width: min(100%, 340px);
        padding: 22px;
        border-radius: 28px;
        background: rgba(14, 8, 22, 0.68);
        border: 1px solid rgba(187, 140, 255, 0.14);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
    }

    &__logo {
        width: 72px;
        height: 72px;
        object-fit: cover;
        border-radius: 20px;
    }

    &__panel-copy,
    &__panel-list {
        display: grid;
        gap: 8px;
    }

    &__panel-label,
    small {
        color: rgba(255, 255, 255, 0.72);
    }

    &__panel-copy strong,
    &__panel-list strong {
        font-size: 1.08rem;
        color: #fff;
    }

    &__panel-list {
        grid-template-columns: 1fr;
        gap: 14px;
    }

    &__noise,
    &__orb {
        position: absolute;
        z-index: 1;
        pointer-events: none;
    }

    &__noise {
        inset: 0;
        opacity: 0.03;
        background-image: linear-gradient(
                rgba(255, 255, 255, 0.6) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.6) 1px,
                transparent 1px
            );
        background-size: 32px 32px;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent);
    }

    &__orb {
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(187, 140, 255, 0.34),
            transparent 72%
        );

        &--one {
            width: 16rem;
            height: 16rem;
            top: -2rem;
            right: 8%;
            animation: hero-float 12s ease-in-out infinite;
        }

        &--two {
            width: 10rem;
            height: 10rem;
            bottom: -2rem;
            left: 42%;
            animation: hero-float 15s ease-in-out infinite reverse;
        }
    }
}

@keyframes hero-float {
    0%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(0, -14px, 0);
    }
}

@media (max-width: 959px) {
    .hero {
        width: min(calc(100% - 24px), 1320px);
    }
}
</style>
