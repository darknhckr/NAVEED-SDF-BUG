const { delay } = require('@whiskeysockets/baileys');

async function report(sock, target) {
    try {
        // 1. Send Spam Report
        await sock.report(target, {
            reason: 'spam',
            spam: true
        });
        await delay(500);

        // 2. Send "Dangerous" Interactive Message to trigger automated filters
        const payload = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: "REPORT SYSTEM",
                            hasSubtitle: true
                        },
                        body: {
                            text: "⚠️ This user is violating terms of service. " + "🚩".repeat(1000)
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "single_select_reply",
                                    buttonParamsJson: JSON.stringify({
                                        title: "Report",
                                        sections: [{
                                            title: "Select Reason",
                                            rows: [
                                                { title: "Spam", id: "spam" },
                                                { title: "Abuse", id: "abuse" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        };

        await sock.relayMessage(target, payload, {
            participant: { jid: target }
        });

        await delay(500);

        // 3. Send additional report stanzas
        for (let i = 0; i < 3; i++) {
            await sock.report(target, {
                reason: 'spam',
                spam: true
            });
            await delay(300);
        }
        
    } catch (e) {
        console.log("Report/Ban error:", e.message);
    }
}

module.exports = { report };
