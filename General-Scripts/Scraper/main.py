from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup

import time

chrome_driver_path = './chromedriver'
service = Service(chrome_driver_path)

chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "localhost:8989")

driver = webdriver.Chrome(service=service, options=chrome_options)

# Automation steps
driver.get('https://home.mlops.community/events/llm-in-prod-part-ii-2023-06-20/people')


time.sleep(12)

# Define the element that contains the scrollable content
scrollable_element = driver.find_element(By.CLASS_NAME, "e1xiffh62")

# Scroll to the end of the page to trigger initial content loading
driver.execute_script("arguments[0].scrollIntoView();", scrollable_element)

# Wait for some time to allow content to load
time.sleep(2)

# Perform infinite scrolling until the desired content is loaded
# counter = 0
# while True:
#     # Scroll to the bottom of the scrollable element
#     driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight;", scrollable_element)
    
#     # Wait for some time to allow content to load
#     time.sleep(4)

#     counter += 1

#     if counter > 2: 
#         break

for element in driver.find_elements(By.CLASS_NAME, "ecpc7j54"):
    element.click()

    time.sleep(5)
    for ele in driver.find_elements(By.CLASS_NAME, "css-mtgedm"):
        soup = BeautifulSoup(driver.page_source, "html.parser")
        print(soup.prettify())
    
    # ele=driver.find_elements(By.XPATH, "/html/body/div[2]/div/div[2]/div/div[2]/button")
    # print(ele)
    # ele[0].click()

    # button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'button.rc-dialog-close')))
    # button.click()

    button=driver.find_element(By.XPATH, '/html/body/div[2]/div/div[2]/div/div[2]/button') 
    time.sleep(3)
    driver.execute_script("arguments[0].click();", button)

    # print(driver.find_element(By.CLASS_NAME, "css-mtgedm").text)
    # print(driver.find_element(By.CLASS_NAME, "css-mtgedm").text())
    

driver.quit()
