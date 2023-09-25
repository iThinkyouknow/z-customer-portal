export { }

declare global {
    interface NameFilterState {
        firstName: string;
        lastName: string;
    }

    interface UsersApiResponseData {
        id: number
        email: string
        first_name: string
        last_name: string
        avatar: string
    }

    interface ButtonPrimaryProps {
        children: any;
        onClick?: MouseEvent<HTMLButtonElement, MouseEvent>
    }

    interface HeaderProps {
        children: any
    }

    interface FooterProps {
        children: any
    }
}