import pymysql.cursors
import requests
from bs4 import BeautifulSoup


html = requests.get('http://music.naver.com/listen/top100.nhn').text
html2 = requests.get('http://music.naver.com/listen/top100.nhn?&page=2').text
soup = BeautifulSoup(html, 'html.parser')
soup2 = BeautifulSoup(html2, 'html.parser')

tag_list = []
tag_list2 = []

for tr_tag in soup.find('tbody').find_all('tr'):
	tag = tr_tag.find(class_='name').find_all('span')

	if tag:
		tag_sub_list = tag
		tag_list.extend(tag_sub_list)


for tr_tag in soup2.find('tbody').find_all('tr'):
	tag = tr_tag.find(class_='name').find_all('span')

	if tag:
		tag_sub_list = tag
		tag_list2.extend(tag_sub_list)



for idx in tag_list:
        print(idx.text)

for idx in tag_list2:
	print(idx.text)
