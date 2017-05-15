class Alexa::RecordBase
  # self.abstract_class = true

  def initialize(host)
    @host = host
    @tasting = Tasting.get_open_for_host(host)
  end


  private

  def plaintext_response(text, end_session=false)
    {
      'version': '1.0',
      'sessionAttributes': { },
      'response': {
        'outputSpeech': {
          'type': 'PlainText',
          'text': text
        },
        'shouldEndSession': end_session
      }
    }
  end

  # def delegate_response(intent, slots=[])
  #   response = {
  #     "type": "Dialog.Delegate",
  #     "updatedIntent": {
  #       "name": "string",
  #       "confirmationStatus": "NONE",
  #       "slots": {}
  #       }
  #     }
  #   }
  #   slots.each do |s|
  #     response["updatedIntent"]["slots"][s.name] = {
  #       "name" : s.name,
  #       "value" : s.value,
  #       "confirmationStatus" : s.confirmationStatus
  #     }
  #   end
  #   render json: response
  # }

end
