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
    width: 100%;
    height: $hero-banner-height;
    display: grid;
    align-items: stretch;
    border-radius: $hero-banner-border-radius;
    overflow: hidden;
    box-shadow: var(--horizon-shadow);
    border: 1px solid rgba(187, 140, 255, 0.16);
    margin: 0 8px;

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
        }
    }

    &__content {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 34px 22px;
        color: $hero-banner-color;

        @include tools.media-breakpoint-up("md") {
            grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
            align-items: center;
            gap: 36px;
            padding: 48px 42px;
        }
    }

    &__copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;

        h1 {
            color: inherit;
            max-width: 14ch;
            margin-bottom: 16px;
            line-height: 1.05;
            font-size: clamp(2.75rem, 5vw, 5rem);
        }

        p {
            max-width: 40rem;
            margin-bottom: 0;
            font-size: 1.05rem;
            line-height: 1.75;
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
        transform: scale(1.05);
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
        margin-top: 28px;
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
        opacity: 0.06;
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
            width: 18rem;
            height: 18rem;
            top: -5rem;
            right: 10%;
            animation: hero-float 12s ease-in-out infinite;
        }

        &--two {
            width: 14rem;
            height: 14rem;
            bottom: -4rem;
            left: 36%;
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
</style>
