Feature: Main Demo App Home Page

  Allows users to see that the base React template application
  has a functional home page and invites the user to take actions
  they may desire in order to expand off of the template to turn
  this repository into their own customized application.

Scenario: Home Page Contains Useful Information
Given I Open The Demo App To The Home Page
When The Application And The Home Page Are Loaded
Then I See The Welcome Message From React Slingshot
And I See The Navigation Buttons At The Top Of The Page
And I Can Navigate To The About Page
