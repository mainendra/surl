import { serve } from "https://deno.land/std@0.157.0/http/server.ts";

let shortUrls = {
    '1111': 'https://www.google.com'
};
const pattern = new URLPattern({ pathname: '/:id' });

serve(req => {
    try {
        if (req.method === 'POST') {
            return req.json().then(urls => {
                shortUrls = urls;
                return Response.json(shortUrls);
            });
        } else if (pattern.test(req.url)) {
            const { id } = pattern.exec(req.url).pathname.groups;
            return shortUrls[id] ? Response.redirect(shortUrls[id], 302) : (new Response(''));
        } else {
            return Response.json(shortUrls);
        }
    } catch (err) {
        return Response.error(err);
    }
});
