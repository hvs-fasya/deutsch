# require 'capybara/rails'
require 'rails_helper'

RSpec.feature "StartPage", type: :feature do
  # pending "add some scenarios (or delete) #{__FILE__}"
  describe "navbar" do
  	it "suppose sign in or register to unsigned user", :js => true do
  		visit "/"
  		expect(page).to have_text("Bitte melden Sie sich an oder registrieren !!!")
  	end
  	it "shows brand", :js => true do
  		visit "/"
  		expect(page.find('.md-toolbar-tools')).to have_text("Deutsch")
  	end
  	it "shows login/register menu", :js => true do
  		visit "/"
  		expect(page.find('.md-toolbar-tools')).to have_button("Log In")
  		expect(page.find('.md-toolbar-tools')).to have_button("Register")
  	end
  	it "doesn't show logout button", :js => true do
  		visit "/"
  		expect(page.find('.md-toolbar-tools')).not_to have_button("Log Out")
  	end
  	it "shows logout button and <user.email> for logged in user", :js => true do
  		user = FactoryGirl.create(:user)
		login_as(user, :scope => :user)
  		visit "/"
  		expect(page.find('.md-toolbar-tools')).to have_button("Log Out")
  		expect(page.find('.md-toolbar-tools')).to have_button(user.email)
  	end
  	it "says <logged in> after login", :js => true do
  		user = FactoryGirl.create(:user)
  		visit "/"
  		click_button("Log In")
  		fill_in('email', :with => user.email)
  		fill_in('pswrd', :with => user.password)
  		click_button("Submit")
  		# logout(:user)
  		expect(page).to have_text("Du bist eingeloggt !!!")
  	end
  	it "says <logged out> after logging out", :js => true do
  		user = FactoryGirl.create(:user)
  		login_as(user, :scope => :user)
  		visit "/"
  		click_button("Log Out")
  		# logout(:user)
  		expect(page).to have_text("Sie wurden ausgeloggt !!!")
  	end
  end
end
