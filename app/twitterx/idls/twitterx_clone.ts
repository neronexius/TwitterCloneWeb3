export type TwitterxClone = {
  "version": "0.1.0",
  "name": "twitterx_clone",
  "instructions": [
    {
      "name": "initialiseUserProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initialiser",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialiseUserUsername",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "username",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "inputUsername",
          "type": "string"
        }
      ]
    },
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "content",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "imageUrl",
          "type": {
            "option": {
              "vec": "string"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userProfileState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numberOfPost",
            "type": "u32"
          },
          {
            "name": "username",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "profileImage",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "usernameState",
      "docs": [
        ""
      ],
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "postDataState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "numberOfComment",
            "type": "u32"
          },
          {
            "name": "content",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "imageUrl",
            "type": {
              "option": {
                "vec": "string"
              }
            }
          },
          {
            "name": "postedTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "commentDataState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "commenter",
            "type": "publicKey"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UsernameIsTooBig",
      "msg": "Username is too big!"
    },
    {
      "code": 6001,
      "name": "UsernameHasAlreadyBeenInitialise",
      "msg": "Already Initialised Username"
    },
    {
      "code": 6002,
      "name": "UsernameContainsSymbolsThatAreNotAllowed",
      "msg": "Username contain Non Alphabatic"
    }
  ]
};

export const IDL: TwitterxClone = {
  "version": "0.1.0",
  "name": "twitterx_clone",
  "instructions": [
    {
      "name": "initialiseUserProfile",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initialiser",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialiseUserUsername",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "username",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "inputUsername",
          "type": "string"
        }
      ]
    },
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "content",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "imageUrl",
          "type": {
            "option": {
              "vec": "string"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userProfileState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numberOfPost",
            "type": "u32"
          },
          {
            "name": "username",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "profileImage",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "usernameState",
      "docs": [
        ""
      ],
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "postDataState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "numberOfComment",
            "type": "u32"
          },
          {
            "name": "content",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "imageUrl",
            "type": {
              "option": {
                "vec": "string"
              }
            }
          },
          {
            "name": "postedTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "commentDataState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "commenter",
            "type": "publicKey"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UsernameIsTooBig",
      "msg": "Username is too big!"
    },
    {
      "code": 6001,
      "name": "UsernameHasAlreadyBeenInitialise",
      "msg": "Already Initialised Username"
    },
    {
      "code": 6002,
      "name": "UsernameContainsSymbolsThatAreNotAllowed",
      "msg": "Username contain Non Alphabatic"
    }
  ]
};
