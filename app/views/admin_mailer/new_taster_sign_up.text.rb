
Yno Taster: <%= @taster.name %> (<%= @taster.handle %>)
Email: <%= @taster.user.email %>
Created: <%= @taster.created_at.in_time_zone("Pacific Time (US & Canada)").strftime("%a, %b %-d %Y %I:%M%P %Z") %>
Status: <%= @taster.status %>
