document.addEventListener('DOMContentLoaded', () => {
    const cameraMovementSelect = document.getElementById('camera-movement');

    const cameraMovements = {
        "Static": "Statis",
        "Pan Left": "Geser Kiri",
        "Pan Right": "Geser Kanan",
        "Tilt Up": "Miring ke Atas",
        "Tilt Down": "Miring ke Bawah",
        "Zoom In": "Perbesar",
        "Zoom Out": "Perkecil",
        "Dolly In": "Dolly Masuk",
        "Dolly Out": "Dolly Keluar",
        "Tracking Shot": "Tembakan Pelacakan",
        "Crane Up": "Derek ke Atas",
        "Crane Down": "Derek ke Bawah",
        "Handheld": "Genggam",
        "Steadicam": "Steadicam",
        "First-Person View (FPV)": "Tampilan Orang Pertama (FPV)",
        "Drone Shot": "Tembakan Drone",
        "Aerial Shot": "Tembakan Udara",
        "Dutch Angle": "Sudut Belanda",
        "Whip Pan": "Whip Pan",
        "Crash Zoom": "Crash Zoom",
        "Slow Motion": "Gerak Lambat",
        "Time-Lapse": "Selang Waktu",
        "Reverse": "Mundur",
        "3D Rotation": "Rotasi 3D",
        "Arc Shot": "Tembakan Busur",
        "Vertigo Effect": "Efek Vertigo",
        "Jib Shot": "Tembakan Jib",
        "Car Mount Shot": "Tembakan Dudukan Mobil",
        "Snorricam Shot": "Tembakan Snorricam",
        "Top-Down Shot": "Tembakan dari Atas ke Bawah",
        "Low Angle Shot": "Tembakan Sudut Rendah",
        "High Angle Shot": "Tembakan Sudut Tinggi",
        "Over the Shoulder Shot": "Tembakan dari Atas Bahu",
        "Point of View (POV) Shot": "Tembakan Sudut Pandang (POV)",
    };

    for (const [en, id] of Object.entries(cameraMovements)) {
        const option = document.createElement('option');
        option.value = en;
        option.textContent = `${en} (${id})`;
        cameraMovementSelect.appendChild(option);
    }

    const generateBtn = document.getElementById('generate-btn');

    const translationDict = {
        "seorang vlogger pria muda": "a young male vlogger",
        "asal maluku": "from Maluku",
        "berusia 27 tahun": "27 years old",
        "perawakan/bentuk tubuh": "Physique/Body Shape:",
        "tubuh kekar": "sturdy body",
        "tinggi 164cm": "164cm tall",
        "bentuk badan proporsional": "proportional build",
        "warna kulit": "Skin color:",
        "sawo matang cerah": "bright sawo matang (a light brown complexion)",
        "rambut": "Hair:",
        "lurus, hitam kecokelatan, belah samping": "straight, brownish-black, side-parted",
        "wajah": "Face:",
        "wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural": "oval-shaped face, naturally thick eyebrows, large black eyes, a friendly smile, rosy cheeks, natural lips",
        "pakaian": "Clothing:",
        "mengenakan jaket hoddie warna loreng dan celana panjang hitam robek di lutut, membawa ransel kecil": "wearing a camouflage hoodie jacket and black pants torn at the knee, carrying a small backpack",
        "dia berbicara dengan suara pria muda yang hangat dan penuh semangat": "He speaks with the warm and enthusiastic voice of a young man",
        "nada": "Tone:",
        "timbre": "Timbre:",
        "bersahabat dan enerjik": "friendly and energetic",
        "aksen/logat": "Accent/Dialect:",
        "logat indonesia dengan sentuhan khas maluku halus, berbicara murni dalam bahasa indonesia": "Indonesian accent with a smooth, distinctive Maluku touch, speaking purely in Indonesian",
        "cara berbicara": "Speaking Style:",
        "tempo sedang-cepat, gaya bicara lincah dan ekspresif": "medium-to-fast tempo, a lively and expressive manner of speaking",
        "penting": "IMPORTANT:",
        "seluruh dialog harus dalam bahasa indonesia dengan pengucapan natural dan jelas. pastikan suara karakter ini konsisten di seluruh video.": "All dialogue must be in Indonesian with natural and clear pronunciation. Ensure this character's voice remains consistent throughout the video.",
        "berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang": "walking around the night bus terminal, observing the activities of passengers and vendors",
        "karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera": "The character shows an expression of awe and enthusiasm, often smiling while glancing at the camera",
        "kagum dan antusias, sering tersenyum sambil melirik kamera": "awe and enthusiasm, often smiling while glancing at the camera",
        "latar tempat": "Setting:",
        "di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala": "at an intercity bus terminal at night, street vendors line the departure lane, several buses are lined up with their lights on",
        "waktu": "Time:",
        "malam hari, hujan rintik-rintik": "nighttime, with a light drizzle",
        "pencahayaan": "Lighting:",
        "natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah": "natural from street and bus lights, with light reflecting off the wet asphalt",
        "gaya video/art style": "Video/Art Style:",
        "cinematic realistis": "realistic cinematic",
        "kualitas visual": "Visual Quality:",
        "resolusi 4k": "4K Resolution",
        "suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan": "A busy, crowded atmosphere, with the impression of a lively and dynamic night journey despite the rain",
        "sound": "SOUND:",
        "suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang": "the roar of bus engines, announcements from loudspeakers, the gentle pitter-patter of light rain, and the faint chatter of passengers and vendors",
        "dialog dalam bahasa indonesia: karakter berkata": "DIALOGUE in Indonesian: Character says",
        "hindari": "Avoid:",
        "teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah": "on-screen text, subtitles, text in video, fonts, logos, distortion, artifacts, anomalies, multiple faces, deformed limbs, abnormal hands, extra people, distracting objects, low quality, blur, glitch, robotic voices, broken audio",
    };

    const translateAPI = (text) => {
        return new Promise((resolve) => {
            if (!text) return resolve("");
            let translatedText = text;
            const sortedKeys = Object.keys(translationDict).sort((a, b) => b.length - a.length);
            for (const key of sortedKeys) {
                const regex = new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
                translatedText = translatedText.replace(regex, translationDict[key]);
            }
            setTimeout(() => resolve(translatedText), 50); // Simulate API latency
        });
    };

    const getAllInputs = () => {
        return {
            sceneTitle: document.getElementById('scene-title').value,
            characterDesc: document.getElementById('character-desc').value,
            characterVoice: document.getElementById('character-voice').value,
            characterAction: document.getElementById('character-action').value,
            characterExpression: document.getElementById('character-expression').value,
            locationTime: document.getElementById('location-time').value,
            visualDetails: document.getElementById('visual-details').value,
            cameraMovement: document.getElementById('camera-movement').value,
            overallMood: document.getElementById('overall-mood').value,
            environmentSound: document.getElementById('environment-sound').value,
            characterDialogue: document.getElementById('character-dialogue').value,
            negativePrompt: document.getElementById('negative-prompt').value,
        };
    };

    const generateIndonesianPrompt = (inputs, cameraMovements) => {
        const { sceneTitle, locationTime, characterDesc, characterAction, characterExpression, characterVoice, environmentSound, characterDialogue, visualDetails, cameraMovement, overallMood, negativePrompt } = inputs;
        return `Sebuah video cinematic realistis dengan resolusi 4K.

**Scene:** ${sceneTitle}. ${locationTime}.

**Karakter:** ${characterDesc} ${characterAction}, menunjukkan ekspresi ${characterExpression}.

**Audio:** ${characterVoice} ${environmentSound}

**Dialog:** ${characterDialogue}

**Visual:** Gaya video adalah cinematic realistis. ${visualDetails}. Gerakan kamera menggunakan ${cameraMovement} (${cameraMovements[cameraMovement]}). Suasananya adalah ${overallMood}.

**Negative Prompt:** ${negativePrompt}`;
    };

    const generateEnglishPrompt = async (inputs) => {
        const { sceneTitle, locationTime, characterDesc, characterAction, characterExpression, characterVoice, environmentSound, characterDialogue, visualDetails, cameraMovement, overallMood, negativePrompt } = inputs;
        
        const [
            enSceneTitle,
            enLocationTime,
            enCharacterDesc,
            enCharacterAction,
            enCharacterExpression,
            enCharacterVoice,
            enEnvironmentSound,
            enVisualDetails,
            enOverallMood,
            enNegativePrompt,
        ] = await Promise.all([
            translateAPI(sceneTitle),
            translateAPI(locationTime),
            translateAPI(characterDesc),
            translateAPI(characterAction),
            translateAPI(characterExpression),
            translateAPI(characterVoice),
            translateAPI(environmentSound),
            translateAPI(visualDetails),
            translateAPI(overallMood),
            translateAPI(negativePrompt),
        ]);

        return `A realistic cinematic 4K video.

**Scene:** ${enSceneTitle}. ${enLocationTime}.

**Character:** ${enCharacterDesc} ${enCharacterAction}, showing an expression of ${enCharacterExpression}.

**Audio:** ${enCharacterVoice} ${enEnvironmentSound}

**Dialog:** ${characterDialogue}

**Visual:** The video style is realistic cinematic. ${enVisualDetails}. The camera movement uses ${cameraMovement}. The atmosphere is ${enOverallMood}.

**Negative Prompt:** ${enNegativePrompt}`;
    };

    generateBtn.addEventListener('click', () => {
        const inputs = getAllInputs();
        
        const indonesianPrompt = generateIndonesianPrompt(inputs, cameraMovements);
        document.getElementById('indonesian-prompt').value = indonesianPrompt;

        // Set loading state
        document.getElementById('english-prompt').value = "Translating...";

        generateEnglishPrompt(inputs)
            .then(englishPrompt => {
                document.getElementById('english-prompt').value = englishPrompt;
            })
            .catch(error => {
                console.error("Translation failed:", error);
                document.getElementById('english-prompt').value = "Error: Could not translate the prompt.";
            });
    });
}); 