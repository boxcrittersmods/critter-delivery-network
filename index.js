/*
 * index.js
 * 
 * Copyright 2020 Alvarito050506 <donfrutosgomez@gmail.com>
 * Copyright 2020 The Box Critters Modding Community
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * 
 */

var extensions_mimes = {
	"js": "application/javascript",
	"json": "application/json",
	"css": "text/css",
	"scss": "text/css",
	"html": "text/html",
	"htm": "text/html",
	"xhtml": "application/xml+html",
	"svg": "image/svg+xml",
	"mjs": "text/javascript",
	"cjs": "text/javascript",
	"jsonp": "application/javascript"
};

async function handle(req)
{
	var url = new URL(req.url);
	var extension = url.pathname.split(".").pop();
	var res = await fetch("https://raw.githubusercontent.com/boxcrittersmods/" + url.pathname, {
		cf: {
			cacheTtl: 5,
			cacheEverything: true,
		}
	});
	res = new Response(res.body, res);
	if (extension in extensions_mimes)
	{
		res.headers.set("Content-Type", extensions_mimes[extension] + ";charset=UTF-8");
	} else
	{
		res.headers.set("Content-Type", "text/plain;charset=UTF-8");
	}
	res.headers.set("Cache-Control", "max-age=432000");
	return res;
}

addEventListener("fetch", function (event) {
	return event.respondWith(handle(event.request));
});
