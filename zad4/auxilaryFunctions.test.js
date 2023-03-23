const puppeteer = require('puppeteer');
const { check_if_has_at_least_one_special_char, check_if_has_at_least_eight_chars, check_if_has_at_lest_one_capital_letter, check_if_has_at_least_one_digit } = require('./auxilaryFunctions');
const { validate_password } = require('./auxilaryFunctions');

test("Should password has at least 8 chars", () => {
    expect(check_if_has_at_least_eight_chars("Maksiu1")).toBe(false);
    expect(check_if_has_at_least_eight_chars("Maksiu123")).toBe(true);
    expect(check_if_has_at_least_eight_chars('Maksiuuu1232')).toBe(true);
});

test("Should password has at least one capital letter", () => {
    expect(check_if_has_at_lest_one_capital_letter("maksiu123")).toBe(false);
    expect(check_if_has_at_lest_one_capital_letter("Maksiu123")).toBe(true);
});

test("Should password has at least one special character", () => {
    expect(check_if_has_at_least_one_special_char('RobecrcikZiom123')).toBe(false);
    expect(check_if_has_at_least_one_special_char("RobercikZiom123!")).toBe(true);
    expect(check_if_has_at_least_one_special_char("Roberci!123@")).toBe(true);
});

test("Should password has at least one digit", () => {
    expect(check_if_has_at_least_one_digit("Maksiuziomal")).toBe(false);
    expect(check_if_has_at_least_one_digit("Maksiuzioml1")).toBe(true);
    expect(check_if_has_at_least_one_digit("MaksiuZiomal123")).toBe(true);
});

// integrated test
test("Should correctly validate password", () => {
    expect(validate_password("MaksiuToPalka123")).toBe(false);
    expect(validate_password("Maksiu123!")).toBe(true);
    expect(validate_password("MaksiuGibas@!1234")).toBe(true);
    expect(validate_password("MG123!")).toBe(false);
    expect(validate_password("Maksiu!@#")).toBe(false);
    expect(validate_password("Maksiu123")).toBe(false);
});

// e2e test
test("Should hide password when click on icon", async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage();
    await page.goto('file:///Users/kamilstecyk/Desktop/zadania_webowe_lab6/zad4/index.html');

    await page.click('#hide_new_password_icon');
    await page.click('#hide_repeat_password_icon');
    let input1_type = await page.$eval("#new_password_input", element => element.getAttribute('type'));
    let input2_type = await page.$eval("#repeat_password_input", element => element.getAttribute('type'));
    console.log(input1_type, " ", input2_type);

    expect(input1_type).toBe('text');
    expect(input2_type).toBe('text');

    browser.close();
}, 20000);

test("Should change font color on green when fulfilled password condition", async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--window-size=1920,1080'],
        slowMo: 25
    })
    const page = await browser.newPage();
    await page.goto('file:///Users/kamilstecyk/Desktop/zadania_webowe_lab6/zad4/index.html');

    await page.type('#new_password_input', "Maksiu");
    let at_least_one_capital_letter_font_color = await page.$eval("#one_capital_letter_requirement", element => getComputedStyle(element).color);
    let inputPassword = await page.$eval('#new_password_input', el => el.value);


    expect(at_least_one_capital_letter_font_color).toBe('rgb(0, 128, 0)');
    
    await page.click("#new_password_input");
    for (let i = 0; i < inputPassword.length; i++) {
        await page.keyboard.press('Backspace');
    }

    await page.type('#new_password_input', "Maksiu123@!");
    at_least_one_capital_letter_font_color = await page.$eval("#one_capital_letter_requirement", element => getComputedStyle(element).color);
    at_least_8_letters = await page.$eval("#characters_requirement", element => getComputedStyle(element).color);
    at_least_one_special_character = await page.$eval("#one_special_character_requirement", element => getComputedStyle(element).color);
    at_least_one_digit = await page.$eval("#one_digit_requirement", element => getComputedStyle(element).color);

    expect(at_least_one_capital_letter_font_color).toBe('rgb(0, 128, 0)');
    expect(at_least_8_letters).toBe('rgb(0, 128, 0)');
    expect(at_least_one_special_character).toBe('rgb(0, 128, 0)');
    expect(at_least_one_digit).toBe('rgb(0, 128, 0)');

    inputPassword = await page.$eval('#new_password_input', el => el.value);

    await page.click("#new_password_input");
    for (let i = 0; i < inputPassword.length; i++) {
        await page.keyboard.press('Backspace');
    }

    at_least_one_capital_letter_font_color = await page.$eval("#one_capital_letter_requirement", element => getComputedStyle(element).color);
    at_least_8_letters = await page.$eval("#characters_requirement", element => getComputedStyle(element).color);
    at_least_one_special_character = await page.$eval("#one_special_character_requirement", element => getComputedStyle(element).color);
    at_least_one_digit = await page.$eval("#one_digit_requirement", element => getComputedStyle(element).color);
    
    expect(at_least_one_capital_letter_font_color).toBe('rgb(0, 0, 0)');
    expect(at_least_8_letters).toBe('rgb(0, 0, 0)');
    expect(at_least_one_special_character).toBe('rgb(0, 0, 0)');
    expect(at_least_one_digit).toBe('rgb(0, 0, 0)');
    
}, 40000);

test("Should show message that passwords are not the same", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920,1080'],
        slowMo: 25
    })
    const page = await browser.newPage();
    await page.goto('file:///Users/kamilstecyk/Desktop/zadania_webowe_lab6/zad4/index.html');

    await page.type('#new_password_input', "MaksiuGibas123!!!");
    await page.type('#repeat_password_input',  "MaksiuGibas");

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toBe('Passwords are not the same, you have to correct them!');
    });

    await page.click('#repeat_password_input');
    await page.keyboard.press('Enter');

    await browser.close();

}, 20000);

