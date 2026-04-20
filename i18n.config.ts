export default defineI18nConfig(() => ({
    legacy: false,
    locale: "en-US",
    numberFormats: {
        "en-US": {
            currency: {
                style: "currency",
                currency: "USD",
                notation: "standard",
            },
        },
    },
    messages: {
        "en-US": {
            store_name: "Horizon: Wildlands SMP",
            play: "play.horizonrp.net",
            index: {
                hero: {
                    title: "Horizon: Wildlands SMP",
                    subtitle: "Support the server. Unlock perks. Keep the wildlands thriving.",
                },
                welcome: {
                    title: "Welcome to the Horizon: Wildlands SMP store",
                    body_1:
                        "Purchases help support server hosting, events, development, and future content. Packages are delivered automatically in-game after checkout. Make sure your Minecraft username is spelled correctly before buying.",
                    body_2:
                        "All packages are designed for the Horizon economy, Lifesteal progression, crates, clans, and survival gameplay. Perks may be adjusted over time for server balance, but purchased packages will keep their intended value.",
                },
            },
            buttons: {
                checkout: "Proceed to Checkout",
                cart: "Cart | Cart ({n}) | Cart ({n})",
                add_to_cart: "Add to cart",
                add_gift_to_cart: "Add Gift to Cart",
                gift: "Gift",
                login: "Login",
                logout: "Log Out",
                copied: "Copied!",
                home: "Home",
                menu: "Menu",
                go_to_top: "Go to top",
            },
            auth: {
                login: {
                    title: "Please enter your {gameTypeName} username",
                },
                logout: {
                    title: "Are you sure you want to log out?",
                },
                login_redirect: {
                    title: "Click here to login",
                    method: "Login with {name}",
                },
                login_complete: {
                    title: "Logged in successfully",
                },
                username: "Username",
            },
            gift: {
                input_placeholder: "Recipient {gameTypeName} Username",
            },
            error: {
                page_not_found: "Page not found",
                cannot_add_package:
                    "You are not allowed to purchase this package",
            },
            footer: {
                join_our_discord: "Join our Discord",
                copyright: "© 2026 {storeName}. All rights reserved.",
                support_note:
                    "If your purchase does not arrive within a few minutes, open a support ticket with your Minecraft username, package name, and Tebex transaction ID.",
                disclaimer:
                    "Purchases are digital goods for Horizon: Wildlands SMP. Items, ranks, keys, and currency are delivered to the Minecraft username entered at checkout. Chargebacks or payment disputes may result in account restrictions until resolved.",
                tebex: {
                    description:
                        "This website and its checkout process is operated by our online reseller & Merchant of Record, Tebex Limited, who also handles order-related inquiries and refunds.",
                    impressum: "Impressum",
                    privacy_policy: "Privacy Policy",
                    tos: "Terms of Service",
                },
            },
            messages: {
                success: {
                    added_to_cart: "{name} Added to cart",
                    removed_from_cart: "{name} Removed from cart",
                },
            },
            sidebar: {
                menu: "Menu",
            },
            titles: {
                login: "Login",
                package: "{name}",
            },
            checkout: {
                completed: {
                    title: "Thank you for your order",
                    subtitle:
                        "You should receive your items within a few minutes",
                },
            },
            cart: {
                title: "Cart",
                empty: "Your cart is empty",
                total: "Total",
                item: {
                    quantity: "x{quantity}",
                    gift_to: "Gift to {username}",
                },
            },
            category: {
                image_alt: "An image for the {name} category",
            },
        },
    },
}));
