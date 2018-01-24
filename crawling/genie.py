import pymysql.cursors
import requests
from bs4 import BeautifulSoup


html2 = requests.get('http://www.genie.co.kr/chart/top100?pg=2').text
html = requests.get('http://www.genie.co.kr/chart/top100').text

soup = BeautifulSoup(html, 'html.parser')
soup2 = BeautifulSoup(html2, 'html.parser')


tag_list = []
tag_list2 = []

for tr_tag in soup.find('tbody').find_all('tr'):
	tag = tr_tag.find_all(class_='title ellipsis')

	if tag:
		tag_sub_list = tag
		tag_list.extend(tag_sub_list)

for tr_tag2 in soup2.find('tbody').find_all('tr'):
	tag = tr_tag2.find_all(class_='title ellipsis')

	if tag:
		tag_sub_list = tag
		tag_list.extend(tag_sub_list)

for idx in tag_list:
        print(idx.text)

