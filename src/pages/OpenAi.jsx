import React, { useEffect } from 'react';
import { axiosInstance } from '../api';

const speech = window.speechSynthesis;
let voicess;

const OpenAi = () => {
    useEffect(() => {
        function setSpeech() {
            return new Promise(function (resolve, reject) {
                let synth = window.speechSynthesis;
                let id;

                id = setInterval(() => {
                    if (synth.getVoices().length !== 0) {
                        resolve(synth.getVoices());
                        clearInterval(id);
                    }
                }, 10);
            });
        }

        let s = setSpeech();
        s.then((voices) => (voicess = voices));
    }, []);

    useEffect(() => {
        // axiosInstance
        //     .get('/engines')
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((error) => {});

        axiosInstance
            .post('/completions', {
                model: 'text-davinci-003',
                prompt: 'what is happening to twitter',
                temperature: 0,
                max_tokens: 100,
                stop: '. ',
            })
            .then((res) => {
                var msg = new SpeechSynthesisUtterance();
                msg.text = res.data.choices[0].text;
                msg.volume = 1;
                msg.rate = 1;
                msg.pitch = 1;
                msg.lang = 'es';
                msg.voice = voicess[1];
                // speech.speak(msg);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <div>OpenAi</div>;
};

export default OpenAi;
