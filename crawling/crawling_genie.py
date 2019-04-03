from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import json

def save_json(data):
    with open('crawling_genie.json', 'w') as f:
        json.dump(data, f)
    print('melon crawling saved')

if __name__ == "__main__":
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome')
    driver = webdriver.Chrome('chromedriver', chrome_options=options)
    
    top200 = []
    for times in range(4):
        if times == 0:
            link = 'https://www.genie.co.kr/chart/top200'
        elif times == 1:
            print('50 out of 200')
            link = 'https://www.genie.co.kr/chart/top200?pg=2'    
        elif times == 2:
            print('100 out of 200')
            link = 'https://www.genie.co.kr/chart/top200?pg=3'
        else:
            print('150 out of 200')
            link = 'https://www.genie.co.kr/chart/top200?pg=4'
        
        driver.get(link)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        
        for each_song in soup.tbody.find_all('tr', {'class':'list'}):
            if each_song.find('span', {'class':'icon icon-19'}):
                each_song.find('span', {'class':'icon icon-19'}).extract()
            each_song = each_song.find('td', {'class':'info'}).text.strip().replace('\n외\n\n\n|\n', '').split('\n')
            
            for i in each_song:
                i.strip()

            if len(each_song) is not 3:
                if each_song[2] == '|' and len(each_song) == 4:
                    del each_song[2]
                else:
                    print('genie crawling - something wrong with length of each_song', each_song, len(each_song))

            top200.append(each_song)
        
    driver.quit()
    
    #print(top200)
    print(len(top200), 'genie crawling finished')
    save_json(top200)