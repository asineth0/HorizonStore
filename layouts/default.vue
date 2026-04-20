<template>
    <div class="layout layout--default">
        <div class="layout__glow layout__glow--one"></div>
        <div class="layout__glow layout__glow--two"></div>
        <Header />

        <MenuSidebar />

        <CartSidebar />

        <div class="w-100 container--fluid">
            <slot />
        </div>

        <Footer />
    </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.layout {
    position: relative;
    overflow: clip;

    &__glow {
        position: fixed;
        pointer-events: none;
        z-index: 0;
        width: 32rem;
        height: 32rem;
        border-radius: 50%;
        filter: blur(12px);
        background: var(--horizon-glow);
        opacity: 0.9;

        &--one {
            top: -8rem;
            left: -6rem;
        }

        &--two {
            top: 18rem;
            right: -8rem;
        }
    }

    &--default {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;
        isolation: isolate;
    }
}
</style>
