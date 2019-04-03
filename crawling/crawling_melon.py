from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import json

def save_json(data):
    with open('crawling_melon.txt', 'w', encoding = 'utf-8') as f:
        json.dump(data, f)
    print('melon crawling saved')

if __name__ == "__main__":
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome')
    driver = webdriver.Chrome('chromedriver', chrome_options=options)
    
    link = 'https://www.melon.com/chart/real/index.htm'
    driver.get(link)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')

    top100 = []
    for each_song in soup.tbody.find_all(id='lst50'):
        title = each_song.find('div', {'class':'ellipsis rank01'}).text.strip()
        singer = each_song.find('span', {'class':'checkEllipsis'}).text.strip()
        album = each_song.find('div', {'class':'ellipsis rank03'}).text.strip()
        top100.append([title,singer,album])
    
    for each_song in soup.tbody.find_all(id='lst100'):
        title = each_song.find('div', {'class':'ellipsis rank01'}).text.strip()
        singer = each_song.find('span', {'class':'checkEllipsis'}).text.strip()
        album = each_song.find('div', {'class':'ellipsis rank03'}).text.strip()
        top100.append([title,singer,album])

    driver.quit()
    #print(top100)
    print(len(top100), 'melon crawling finished')

    save_json(top100)