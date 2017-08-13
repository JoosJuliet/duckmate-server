
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from pyvirtualdisplay import Display

try:
    display = Display(visible=0, size=(800,600))
    display.start()

    options = webdriver.ChromeOptions()
#All the arguments added for chromium to work on selenium
    options.add_argument("--no-sandbox") #This make Chromium reachable
    options.add_argument("--no-default-browser-check") #Overrides default choices
    options.add_argument("--no-first-run")
    options.add_argument("--disable-default-apps")

    print("open chrome")
    driver = webdriver.Chrome('./chromedriver',chrome_options=options)
    print("connecting to soribada..")
    driver.get('http://www.soribada.com/music/chart')

    print("connected to soribada")

    wait_time = 20

    WebDriverWait(driver, wait_time).until(EC.presence_of_element_located((By.XPATH, "//div[@class='list-area2']")))

    l = driver.find_elements_by_xpath("//div[@class='list-area2']")

    i=1
    print("crawling start")
    with open("soribada.txt", "w") as f:
        for elem in l:
            print(str(i)+" 's crawling")
            try:
                f.write(str(i)+"st --------")
                f.write("title: " + elem.find_element_by_xpath(".//span[@class='song-title']").text)
                f.write("artist: " + elem.find_element_by_xpath(".//span[@class='link-type2-name artist']").text)
                f.write("album title: " + elem.find_element_by_xpath(".//span[@class='link-type2 album-title']").text)
            except Exception as e:
                print(e)
                f.write("artist: " + elem.find_element_by_xpath(".//span[@class='link-type2-name artist detail_artist']").text)
            i += 1
except Exception as e:
    print(e)

driver.quit()
display.stop()
