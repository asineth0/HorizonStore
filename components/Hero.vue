<template>
    <div class="hero">
        <div class="hero__background">
            <img
                class="hero__image"
                :src="image"
                alt=""
                aria-hidden="true"
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

                <Button
                    v-if="appConfig.discordUrl"
                    class="hero__discord"
                    tag="a"
                    :href="appConfig.discordUrl"
                    variant="secondary"
                    size="lg"
                    prepend-icon="discord"
                >
                    Join the Discord
                </Button>

                <div class="hero__tags">
                    <span>Premium ranks</span>
                    <span>Crate keys</span>
                    <span>Exclusive perks</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
    border: 1px solid rgba(255, 255, 255, 0.06);
    margin: 34px auto 0;
    animation: hero-arrive var(--horizon-motion-slow) var(--horizon-ease-in-out)
        both;

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
            grid-template-columns: minmax(0, 1fr);
            align-items: center;
            padding: 64px 64px 52px;
        }
    }

    &__copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        max-width: 52rem;

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
    &__tags span {
        backdrop-filter: blur(16px);
    }

    &__pill {
        width: fit-content;
        margin-bottom: 18px;
        padding: 10px 16px;
        border-radius: 14px;
        background: rgba(182, 140, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    &__discord {
        width: fit-content;
        margin-top: 30px;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;

        span {
            padding: 9px 14px;
            border-radius: 14px;
            background: rgba(18, 20, 24, 0.58);
            border: 1px solid rgba(255, 255, 255, 0.07);
            font-size: 0.88rem;
        }
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
        background-image:
            linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
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
            rgba(182, 140, 255, 0.18),
            transparent 72%
        );

        &--one {
            width: 16rem;
            height: 16rem;
            top: -2rem;
            right: 8%;
            animation: hero-float 12s var(--horizon-ease-in-out) infinite;
        }

        &--two {
            width: 10rem;
            height: 10rem;
            bottom: -2rem;
            left: 42%;
            animation: hero-float 15s var(--horizon-ease-in-out) infinite
                reverse;
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

@keyframes hero-arrive {
    from {
        opacity: 0;
        transform: translateY(14px) scale(0.995);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@media (max-width: 959px) {
    .hero {
        width: min(calc(100% - 24px), 1320px);
        margin-top: 22px;
    }
}
</style>
