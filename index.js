var url = 'http://www.essonne.gouv.fr/Demarches-administratives/Accueil-des-etrangers-dans-l-Essonne/Titres-de-sejour-Premiere-demande-ou-Renouvellement/Rendez-vous-pour-un-titre-de-sejour-premiere-demande-renouvellement-modification-d-adresse/Je-dispose-deja-d-un-titre-de-sejour-renouvellement/Je-dispose-d-une-carte-de-sejour-d-une-validite-inferieure-a-10-ans-ou-d-un-VLS-TS-visa-D/Renouvellement-Sous-prefecture-de-PALAISEAU?fbclid=IwAR2v4pi07dJZxYgXkxdcCqkdIJAAxo--aSXqB647Fert7z8odC8RQzvRDhI#';
const puppeteer = require('puppeteer-extra');
const sound = require('sound-play');
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "meddah.abdellah.tcfso@gmail.com",
    pass: "#include<kurama>.^&*9",
  },
});
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

let browser;
let page;
(async () => {
  browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
    slowMo: 10,
  });
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
  console.info('Lunching Page');
  await findRdv();
})();

async function findRdv(){
  console.log("Searching")
  await page.goto("https://www.google.com/");
  await page.goto(url);
  const [button] = await page.$x("//a[contains(., 'le 16 juin 2020 et le 15 novembre 2020')]");
  if (button) {
    await button.click();
    await page.waitForNavigation();
    const [text] = await page.$x("//b[contains(., 'Changement de statut')]");
    if(text) {
      console.log("RENDEZ VOUS TROUVÈ");
      sound.play('C:\\m_Files\\NodeJs\\rdvpref\\SoundHelix-Song-8.mp3');
      let message = {
        from: "meddah.abdellah.spcx@gmail.com",
        to: "meddah.abdellah.spcx@gmail.com", 
        cc: "sarah.tachet.briedj@gmail.com",
        subject: "RENDEZ VOUS DISPONNIBLE PALAISEAU",
        text: "rendez vous disponnible dans la catégorie le 16 juin 2020 et le 15 novembre 2020",
      };
    
      transporter
        .sendMail(message)
      return;
    }
  }

  await findRdv();
}