import pymysql.cursors
import requests
from bs4 import BeautifulSoup
conn = pymysql.connect(
        host='localhost',
        user='root',
        password='root',
        db='duckmate',
        charset='utf8mb4')

html = requests.post('http://www.melon.com/chart/real/index.htm').text
soup = BeautifulSoup(html, 'html.parser')
tag_list = []
tag_list2 = []
for tr_tag in soup.find('tbody').find_all('tr'):
    tag = tr_tag.find(class_='wrap_song_info')
    if tag:
        tag_sub_list = tag.find_all(href=lambda value: (value and 'playSong' in value))
        tag_list.extend(tag_sub_list)
    if tag:
        tag_sub_list2 = tag.find(class_='ellipsis rank02').find_all(class_='checkEllipsis')
        tag_list2.extend(tag_sub_list2)
num=0
for idx in tag_list:
        print(idx.text)
for idx in tag_list2:
        num = num+1
        print(num)
        print(idx.text)
try:
    with conn.cursor() as cursor:
        sql = 'UPDATE chart_melon SET singer_name = \'test\' WHERE idx=\'1\''
        cursor.execute(sql)
    conn.commit()
    print(cursor.rowcount) # 1 (affected rows)
finally:
    conn.close()
