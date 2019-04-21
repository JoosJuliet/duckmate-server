from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import json

def save_json(data):
    with open('crawling_mnet.json', 'w', encoding = 'utf-8') as f:
        json.dump(data, f)
    print('mnet crawling saved')

if __name__ == "__main__":
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome')
    driver = webdriver.Chrome('chromedriver', chrome_options=options)
    
    top100 = []
    for times in range(2):
        if times == 0:
            link = 'http://www.mnet.com/chart/TOP100'
        else:
            link = 'http://www.mnet.com/chart/TOP100?pNum=2'

        driver.get(link)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        for each_song in soup.tbody.find_all('div', {'class':'MMLITitle_Box info'}):
            # 제목이 길면 잘림
            title = each_song.find('a', {'class':'MMLI_Song'}).text.strip()
            singer = each_song.find('a', {'class':'MMLIInfo_Artist'}).text.strip()
            album = each_song.find('a', {'class':'MMLIInfo_Album'}).text.strip()
            top100.append([title,singer,album])
    
    #print(top100)
    print(len(top100), 'mnet crawling finished')
    save_json(top100)