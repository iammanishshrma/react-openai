import axios from 'axios';

const baseURL = 'https://api.openai.com/v1/';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        authorization: 'Bearer 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',
        'openai-organization': 'org-daRfJvMXuBZwQ3kwTgDWoXlX',
    },
});

export { axiosInstance };
