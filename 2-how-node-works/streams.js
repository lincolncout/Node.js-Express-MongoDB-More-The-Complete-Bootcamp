const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // Le o arquivo todo em memória (+simples/arquivos menores)
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
  //////////////////////////
  // Solution 2: Streams
  // vai lendo os arquivos ao pouco com chunks (+roubusto/arquivos maiores/ melhor performance)
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });

  // Solution 3 é melhot pois
  /*
  Você pode estar sobrecarregando o res se ele não conseguir processar os dados tão rápido quanto eles chegam — isso pode causar problemas de desempenho ou até crash.
  .pipe() implementa controle de fluxo com backpressure automaticamente: ele pausa o readable se o res estiver "lotado", e retoma quando estiver pronto.
  */
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
