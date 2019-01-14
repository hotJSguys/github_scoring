const initialState = {
  login: '',
  avatar: '',
  url: '',

  members: [
    {
      login: '',
      avatar: '',
      url: ''
    }
  ],

  repository: [
    {
      url: '',
      name: '',
      language: '',
      private: false,
      description: '',
      commits: [
        {
          name: '',
          date: '',
          message: ''
        }
      ]
    }
  ]
};

export default initialState;
