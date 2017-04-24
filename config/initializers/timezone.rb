Timezone::Lookup.config(:google) do |c|
  c.api_key = ENV['GOOGLE_API_KEY']
  # c.client_id = ENV['GOOGLE_API_ID']
end
