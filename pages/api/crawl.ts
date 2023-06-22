import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url }: any = req.query;

  if (!url) {
    res.status(400).send("Missing URL");
    return;
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the provided URL
  await page.goto(url);

  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a"));
    return anchors.map((anchor) => anchor.href);
  });

  // Send the crawled URLs in the response
  res.json(links);

  await browser.close();
};
