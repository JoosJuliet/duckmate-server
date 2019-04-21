from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import json

def save_json(data):
    with open('crawling_naver.json', 'w', encoding = 'utf-8') as f:
        json.dump(data, f)
    print('naver crawling saved')

if __name__ == "__main__":
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome')
    driver = webdriver.Chrome('chromedriver', chrome_options=options)
    
    top100 = []
    for times in range(2):
        if times == 0:
            link = 'http://music.naver.com/listen/top100.nhn'
        else:
            link = 'http://music.naver.com/listen/top100.nhn?&page=2'

        driver.get(link)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        for i, each_song in enumerate(soup.tbody.find_all('tr')):
            if i == 0:
                pass
            else:
                title = ''
                singer = ''
                singer_class = each_song.find_all('span', {'class':'ellipsis'})
                if len(singer_class) == 1:
                    title = singer_class[0].text.strip()
                    # 가수가 여러 명일 경우 제일 위에 있는 가수만 가져옴, 가수 이름이 길 경우 잘릴 수 있음
                    singer = each_song.find('td', {'class':'_artist artist no_ell2'}).text.strip()
                    pass
                else:
                    title = singer_class[0].text.strip()
                    singer = singer_class[1].text.strip()
                album = each_song.img['alt']

                top100.append([title, singer, album])
    
    #print(top100)
    print(len(top100), 'naver crawling finished')
    save_json(top100)
