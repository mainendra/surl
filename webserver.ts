import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
import cors from "https://deno.land/x/edge_cors/src/cors.ts";

const pattern = new URLPattern({ pathname: '/:id' });

serve(async req => {
    const request = await fetch('https://api.npoint.io/7b8cc7fda586b49d6d87');
    const shortUrls = await request.json();

    if (pattern.test(req.url)) {
        const { id } = pattern.exec(req.url).pathname.groups;
        return shortUrls[id] ? Response.redirect(shortUrls[id], 302) : (new Response(''));
    }

    return cors(req, Response.json(shortUrls));
});
