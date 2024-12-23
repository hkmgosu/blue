import {
  FC,
  useState,
  createContext,
  useContext,
  useEffect,
  createRef,
  useCallback,
} from 'react';

import { useAuth } from 'contexts/auth-context';
import { MathRandom } from 'utils/helpers';
import { userChangeAvatar } from 'api/user';

type stateType = {
  avatars: string[];
  changeAvatarHandler: (avatar: string) => void;
  avatar: string;
  showAvatars: boolean;
  toggleAvatarModal: () => void;
  photoInputRef: any;
  handleSelectPhoto: () => void;
  isFile: boolean;
  RandomAvatar: () => string;
  error: null | string;
};

type AvatarStateType = {
  showAvatars: boolean;
  avatar: string;
  isFile: boolean;
  error: null | string;
};

const Avatars: string[] = [
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-man-1.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-naranjo.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-girl-1.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-girl-2.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-girl-3.png`,
];

const LIMIT_MB = 8;

const AvatarContext = createContext({} as stateType);

const AvatarProvider: FC = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState<AvatarStateType>({
    showAvatars: false,
    avatar: Avatars[Math.floor(MathRandom() * Avatars.length)],
    isFile: false,
    error: null,
  });
  const photoInputRef = createRef<HTMLInputElement>();

  const RandomAvatar = useCallback(
    () => Avatars[Math.floor(MathRandom() * Avatars.length)],
    []
  );

  const changeAvatarHandler = useCallback(
    async (avatarSelected: string): Promise<void> => {
      setState({
        showAvatars: false,
        avatar: avatarSelected,
        isFile: false,
        error: null,
      });

      if (user?.sub) {
        await userChangeAvatar({ avatar: avatarSelected });
      }
    },
    [user?.sub]
  );

  const toggleAvatarModal = useCallback(
    (): void =>
      setState((prevState) => ({
        ...prevState,
        showAvatars: !prevState.showAvatars,
      })),
    []
  );

  const handleSelectPhoto = useCallback((): void => {
    if (photoInputRef.current && photoInputRef.current?.files) {
      const reader = new FileReader();
      const file = photoInputRef.current?.files[0];

      if (file.size / 1024 / 1024 > LIMIT_MB) {
        setState((prev) => ({
          ...prev,
          error: `La imagen no puede superar los ${LIMIT_MB} MB de tamaño.`,
        }));
        return;
      }

      reader.onload = async () => {
        const avatarimg = new Image();
        avatarimg.src = reader.result as string;

        if (user?.sub) {
          await userChangeAvatar({ file: avatarimg.src });
        }

        setState({
          showAvatars: false,
          avatar: avatarimg.src,
          isFile: true,
          error: null,
        });
      };

      reader.readAsDataURL(photoInputRef.current?.files[0]);
    }
  }, [photoInputRef, user?.sub]);

  useEffect(() => {
    if (user?.profile_pic) {
      setState((prev) => ({
        ...prev,
        avatar: user?.profile_pic || RandomAvatar(),
      }));
    }
  }, [RandomAvatar, user?.profile_pic]);

  const value = {
    avatars: Avatars,
    avatar: state.avatar,
    showAvatars: state.showAvatars,
    changeAvatarHandler,
    toggleAvatarModal,
    photoInputRef,
    handleSelectPhoto,
    isFile: state.isFile,
    RandomAvatar,
    error: state.error,
  };

  return (
    <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
  );
};

const useAvatar = (): stateType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within a AvatarProvider');
  }
  return context;
};

export { AvatarProvider, useAvatar };
