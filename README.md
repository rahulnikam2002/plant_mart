# Plant Mart

## Rules set

- Pull the dev branch before making changes to any file (Dev branch will contain all updated code base)
- Make sure to push code only and only if you have completed certain functionlity
- First mention the functionality that you have completed on WhatsApp group and then push the code
- Do not install unnecessary library/packages/dependencies, Before installing first communicate on WhatsApp group
- Do not push code directly on master branch
- Make sure you are in right directory before you commit or push the code (You should be on root directory)
- Below mentioned the correct way to push code

### How to Push code to our own branch via GIT

1. Pull the updated code from dev branch

```bash
    git pull origin dev
```

2. Write your code
3. Once your one functionality is completed make sure to commit and push the code by using

```bash
    git add .
    git commit -m "Your Commit Message"
    git push origin origin your_respective_branch_name
```

### How to Push code to dev branch via GIT

<strong>Why to dev branch?</strong></br>
Now you have updated you branch and now you need to push the same code to dev branch so that rest all members can access the updated code and as there should be all updated code in dev branch, for this follow the below steps

1. Switch to dev branch from your branch

```bash
    git checkout dev
```

2. Pull the code from your branch, so that your code will be added to dev branch

```bash
    git pull origin your_respective_branch_name
```

3. Now whatever code you have written in your branch will get updated to dev branch automatically, now you only need to push dev branch code, for that follow below code

```bash
    git add .
    git commit -m "updated dev by your_Name
    git push origin dev
```

4. Now you have successfully pushed the code to dev branch and you again need to switch to your_respective_branch, for that

```bash
    git checkout your_respective_branch_name
```

## GIT commit messages convention

1. If you have added some functionality then your commit message prefix should contain <b style="text-decoration: underline">FEAT</b> which stands for feature

```bash
    git commit -m "FEAT: mention what functionality you contributed"

    Example: git commit -m "FEAT: Create signup component and create the Signin and Send OTP functionalities"
```

```bash
    Note: make sure your commit messages are in present tense and not in past tense check the above example. ^

    Stop using words like:
    1. add
    2. fix bug
    3. update file
    4. I
    5. we
    6. or
    7. you

    1. Do not capitalize commit messages ("FIXED THE BUG!!! REALLY IMPORTANT")
    2. Do not mention anyones name in message

```

```bash
Remember that the primary goal of a commit message is to provide context and understanding about the change introduced by the commit. Clear and informative messages make it easier for you and your team to review, understand, and maintain the codebase over time. Following these guidelines will help you write meaningful Git commit messages.
```
