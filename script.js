async function onRequest(context, request) {
  return request;
}

function DeH(hexString) {
  let result = "";
  const cleanHex = hexString.trim().replace(/\s/g, '');
  for (let i = 0; i < cleanHex.length; i += 2) {
    result += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
  }
  return result;
}

async function onResponse(context, request, response) {
  const A_U = "https://x-wave-server-ff.netlify.app/free18/x-wave.txt";
  const BA_RES_U = "https://x-wave-server-ff.netlify.app/free18/";
  const V_K = "X-WAVE-FREE-ONLINE-1808-2009";
  const E_C = "https://discord.gg/HyM9B4SXGq";
  
  const cuU = request.url;

  let iAC = false;
  try {
    const ache = await fetch(A_U);
    const ate = await ache.text();
    if (ate.includes(V_K)) {
      iAC = true;
    }
  } catch (error) {
    iAC = false;
  }

  if (cuU.includes("/MajorLogin")) {
    const fileN = iAC ? "lo.txt" : "locn.txt";
    try {
      const loginRes = await fetch(BA_RES_U + fileN);
      response.body = await loginRes.text();
    } catch (e) {
      response.body = E_C;
    }
    response.statusCode = 400;
    response.headers["Content-Type"] = "text/html; charset=utf-8";
    return response;
  }

  if (!iAC) {
    response.statusCode = 403;
    response.body = E_C;
    return response;
  }

  let targetFile = "";
  let contentType = "application/octet-stream";

  if (cuU.includes("/fileinfo")) {
    targetFile = "in.txt";
  } else if (cuU.includes("/assetindexer")) {
    targetFile = "3.txt";
  } else if (cuU.includes("/ver.php")) {
    targetFile = "ph.txt";
    contentType = "application/json; charset=utf-8";
  } else {
    return response;
  }

  try {
    const resourceRes = await fetch(BA_RES_U + targetFile);
    const hexData = await resourceRes.text();

    response.body = DeH(hexData);
    response.statusCode = 200;
    response.headers["Content-Type"] = contentType;
    
    delete response.headers["Content-Length"];
    delete response.headers["X-Powered-By"]; 
  } catch (e) {
    response.body = E_C;
    response.statusCode = 403;
  }

  return response;
}

// 🔥 BẮT BUỘC PHẢI CÓ DÒNG NÀY
return onResponse(context, request, response);
