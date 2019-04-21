from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import json

def save_json(data):
    with open('crawling_bugs.json', 'w', encoding = 'utf-8') as f:
        json.dump(data, f)
    print('bugs crawling saved')

if __name__ == "__main__":
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome')
    driver = webdriver.Chrome('chromedriver', chrome_options=options)
    
    link = 'https://music.bugs.co.kr/chart/track/realtime/total'
    driver.get(link)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    top100 = []
    for each_song in soup.tbody.find_all('tr'):
        title = each_song.find('p', {'class':'title'}).text.strip()
        # 가수가 여러 명일 경우 제일 위에 있는 가수만 가져옴
        singer_class = each_song.find('p', {'class':'artist'})
        singer = singer_class.a['title']
        album = each_song.find('a', {'class':'album'}).text.strip()
        top100.append([title,singer,album])

    driver.quit()

    print(len(top100), 'bugs crawling finished')
    #print(top100)
    save_json(top100)