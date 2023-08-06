import cfscrape #pip install cfscrape

scraper = cfscrape.create_scraper()
res = scraper.get("https://inversecurity.org").text
print(res)