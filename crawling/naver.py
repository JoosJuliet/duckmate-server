import pymysql.cursors
import requests
from bs4 import BeautifulSoup


html = requests.get('http://music.naver.com/listen/top100.nhn').text
soup = BeautifulSoup(html, 'html.parser')



tag_list = []
tag_list2 = []

for tr_tag in soup.find('tbody').find_all('tr'):
	tag = tr_tag.find_all(class_='name')

	if tag:
		tag_sub_list = tag
		tag_list.extend(tag_sub_list)

num=0

for idx in tag_list:
        num = num+1
        print(num)
        print(idx.text)

