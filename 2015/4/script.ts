import md5 from "md5";

const secret = "yzbqklnj";

let i = 1;
while (true) {
  const hash = md5(`${secret}${i}`);

  console.log(hash);

  if (hash.startsWith("00000")) {
    console.log(i);
    break;
  }

  i++;
}
