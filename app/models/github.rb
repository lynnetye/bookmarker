# module Github

#   class Client
#     include HTTParty

#     base_uri 'https://api.github.com'

#     # user_agent is specifically for github
#     def initialize(token, user_agent)
#       @token = "token #{token}"
#       @user_agent = user_agent
#       @headers = {
#         "User-Agent" => @user_agent,
#         "Authorization" => @token
#       }
#     end

#     def get_org(org)
#       response = self.class.get("/orgs/#{org}/members", {headers: @headers, query: {per_page:100}})

#     end


#   end

# end