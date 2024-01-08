class Api::GreetingsController < ApplicationController
    def index
        messages = Message.all
        render json: messages
    end
end
